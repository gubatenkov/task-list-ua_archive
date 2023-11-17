import type { NextApiResponse, NextApiRequest } from 'next'

import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { type AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'

const adapter = PrismaAdapter(prisma)

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })
        if (!user) return null

        const passwordMatch = await compare(credentials.password, user.password)

        if (!passwordMatch) return null

        return {
          email: user.email,
          image: user.image,
          name: user.name,
          id: user.id,
        }
      },
      credentials: {
        password: { type: 'password' },
        email: { type: 'text' },
      },
    }),
  ],
  callbacks: {
    session: async ({ newSession, session, trigger, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          image: session.user?.image ?? '',
          name: token.name,
        },
      }
    },
    jwt: async ({ session, profile, account, token, user }) => {
      return user
        ? {
            ...token,
            image: user.image,
            name: user.name,
          }
        : token
    },
  },
  session: {
    maxAge: 24 * 30 * 60 * 60, // 30 days
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  adapter,
}

export const getAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): AuthOptions => {
  return authOptions
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, getAuthOptions(req, res))
// }
