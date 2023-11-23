import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user
      const isOnTaskBoard = nextUrl.pathname.startsWith('/tasks')
      if (isOnTaskBoard) {
        return isLoggedIn // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/tasks', nextUrl))
      }
      return true
    },
    session: async ({ newSession, session, trigger, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          image: session.user?.image ?? '',
          name: token.name,
          id: token.sub,
        },
      }
    },
    jwt: async ({ session, profile, account, token, user }) => {
      return user
        ? {
            ...token,
            image: user.image,
            name: user.name,
            id: token.sub,
          }
        : token
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [], // Add providers with an empty array for now
}
