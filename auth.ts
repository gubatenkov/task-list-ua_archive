import type { NextAuthOptions } from 'next-auth'

// import GitHub from 'next-auth/providers/github'
import Email from 'next-auth/providers/email'
import NextAuth from 'next-auth'

export const config: NextAuthOptions = {
  providers: [],
  callbacks: {},
}

export const { handlers, signOut, signIn, auth } = NextAuth(config)
