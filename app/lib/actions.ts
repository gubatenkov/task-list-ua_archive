'use server'

import type { TTaskLabelValue, TTask } from '@/app/lib/schemaTypes'
import type { FieldValues } from 'react-hook-form'
import type { Session } from 'next-auth'

import {
  validatePriorityFilter,
  validateStatusFilter,
  validPageParams,
} from '@/app/lib/utils'
import { UserCredentialsSchema } from '@/app/lib/schemaTypes'
import { revalidatePath, revalidateTag } from 'next/cache'
import { signOut, signIn, auth } from '@/auth'
import prisma from '@/app/lib/prisma'
import { safeParse } from 'valibot'
import { hash } from 'bcrypt'

// export type State = {
//   errors?: {
//     password?: string[]
//     email?: string[]
//     name?: string[]
//   }
//   message?: string | null
// }

export const createUser = async (formData: FieldValues) => {
  const validatedCredentials = safeParse(UserCredentialsSchema, formData)

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedCredentials.success) {
    return {
      message: 'Missing Fields. Failed to Create User.',
      errors: validatedCredentials.issues,
    }
  }

  const { password, email, name } = validatedCredentials.output

  // Before we create a new user, check if there is existing one
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    // If it does - return message
    if (existingUser) {
      return {
        error: {
          message: `User with email ${existingUser.email} already exist.`,
          data: null,
        },
        success: false,
      }
    }
  } catch (error) {
    // Handle errors
    console.log('Error trying to check user data:', error)
    return {
      error: {
        data: JSON.stringify((error as Error).message),
        message: 'Error trying to check user data.',
      },
      success: false,
    }
  }

  try {
    // Finally create new user record
    const user = await prisma.user.create({
      data: {
        password: await hash(password, 10),
        email,
        name,
      },
    })
    return {
      message: `The user with email ${email} was successfully created.`,
      success: true,
    }
  } catch (error) {
    // Handle errors
    console.log('Error while creating new user:', error)
    return {
      error: {
        data: JSON.stringify((error as Error).message),
        message: 'Error while creating new user.',
      },
      success: false,
    }
  }
}

export async function authenticateUser(formData: FieldValues) {
  try {
    await signIn('credentials', {
      redirect: false,
      ...formData,
    })
    return {
      message: 'Successfully authenticated.',
      success: true,
    }
  } catch (error) {
    return {
      error: {
        data: JSON.stringify((error as Error).message),
        message: 'Authentication error.',
      },
      success: false,
    }
  }
}

export async function signOutUser() {
  try {
    await signOut({ redirect: false })
    return {
      message: 'Successful logout.',
      success: true,
    }
  } catch (error) {
    return {
      error: {
        data: JSON.stringify((error as Error).message),
        message: 'Logout failed.',
      },
      success: false,
    }
  }
}

type MySession = Omit<Session, 'user'> & {
  user: { email: string; image: string; name: string; id: string }
}

export async function getUserTasksByParamsAndFilters({
  perPageParam,
  pageParam,
  priority,
  status,
  query,
}: {
  priority: undefined | string[] | string
  status: undefined | string[] | string
  perPageParam: undefined | string
  pageParam: undefined | string
  query: undefined | string
}): Promise<{ totalTaskCount: number; tasks: TTask[] }> {
  const session = (await auth()) as MySession | null
  /* If no user id handle error (in this case just return empty array),
  otherwise continue. */
  if (!session?.user?.id) return { totalTaskCount: 0, tasks: [] }

  // Prepare parameters
  const validPriority = validatePriorityFilter(priority)
  const validStatus = validateStatusFilter(status)
  const contains = query || ''
  const { perPage, page } = validPageParams({
    perPageParam,
    pageParam,
  })

  try {
    const tasks = (await prisma.userTask.findMany({
      where: {
        title: {
          mode: 'insensitive',
          contains,
        },
        priority: {
          contains: validPriority,
        },
        status: {
          contains: validStatus,
        },
        userId: session.user.id,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })) as TTask[]
    const totalTaskCount = await prisma.userTask.count({
      where: {
        userId: session.user.id,
      },
    })
    return { totalTaskCount, tasks }
  } catch (error) {
    console.log(error)
    return { totalTaskCount: 0, tasks: [] }
  }
}

export async function fetchTasksCount(): Promise<number> {
  const session = (await auth()) as MySession
  if (!session?.user?.id) return 0

  try {
    return await prisma.userTask.count()
  } catch (error) {
    console.log(error)
  }
  return 0
}

export async function updateTaskLabelById(
  taskId: string,
  label: TTaskLabelValue
) {
  try {
    await prisma.userTask.update({
      where: {
        id: taskId,
      },
      data: {
        label,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
