import type { TUser } from '@/app/lib/schemaTypes'

import Credentials from 'next-auth/providers/credentials'
import { LoginFormSchema } from '@/app/lib/schemaTypes'
import prisma from '@/app/lib/prisma'
import { safeParse } from 'valibot'
import NextAuth from 'next-auth'
import { compare } from 'bcrypt'

import { authConfig } from './auth.config'

async function getUser(email: string): Promise<TUser | null> {
  try {
    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as TUser
    return user ? user : null
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { handlers, signOut, signIn, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = safeParse(LoginFormSchema, {
          password: credentials.password,
          email: credentials.email,
        })

        // If validation fails, return errors early. Otherwise, continue.
        if (!parsedCredentials.success) {
          return null
        }

        const { password, email } = parsedCredentials.output

        const user = await getUser(email)
        if (!user) return null
        const passwordsMatch = await compare(password, user.password)
        return passwordsMatch
          ? {
              image: user.image ?? '',
              email: user.email,
              name: user.name,
              id: user.id,
            }
          : null
      },
    }),
  ],
})
