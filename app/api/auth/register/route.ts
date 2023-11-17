import { UserSchema } from '@/lib/schemaTypes'
import { NextResponse } from 'next/server'
import { parseAsync } from 'valibot'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  const body = await req.json()
  const { password, email, name } = await parseAsync(UserSchema, body)
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (exists) {
    return NextResponse.json(
      {
        error: 'User with this email already exists',
      },
      { status: 400 }
    )
  } else {
    const user = await prisma.user.create({
      data: {
        password: await hash(password, 10),
        email,
        name,
      },
    })
    return NextResponse.json({
      email: user.email,
      image: user.image,
      name: user.name,
      id: user.id,
    })
  }
}
