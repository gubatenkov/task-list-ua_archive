// import type { NextApiResponse, NextApiRequest } from 'next'

import authOptions from '@/lib/authConfig'
import NextAuth from 'next-auth/next'

// export const getAuthOptions = (
//   req: NextApiRequest,
//   res: NextApiResponse
// ): AuthOptions => {
//   return authOptions
// }

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, getAuthOptions(req, res))
// }
