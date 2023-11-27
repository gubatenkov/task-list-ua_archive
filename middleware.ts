import NextAuth from 'next-auth'

import { authConfig } from './auth.config'

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // Optionally, don't invoke Middleware on some paths
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
