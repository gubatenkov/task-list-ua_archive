import NextAuth from 'next-auth'

import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

export const config = {
  // Optionally, don't invoke Middleware on some paths
  // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
