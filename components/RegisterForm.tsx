'use client'

import { type TRegisterForm, RegisterFormSchema } from '@/lib/schemaTypes'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { type FieldValues, useForm } from 'react-hook-form'
import { type HTMLAttributes, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
import { parseAsync } from 'valibot'
import { cn } from '@/lib/utils'

interface RegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

export default function RegisterForm({
  className,
  ...props
}: RegisterFormProps) {
  const {
    formState: { errors },
    reset: resetFormState,
    handleSubmit,
    register,
  } = useForm<TRegisterForm>({
    resolver: valibotResolver(RegisterFormSchema),
    mode: 'onSubmit',
  })
  const [isFetching, setIsFetching] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const onRegisterSubmit = async (formData: FieldValues) => {
    try {
      const { password, email, name } = await parseAsync(
        RegisterFormSchema,
        formData
      )
      setIsFetching(true)
      const response = await fetch('/api/auth/register', {
        body: JSON.stringify({
          password,
          email,
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const resultUser = await response.json()
      if (response.ok) {
        toast({
          description: `✅ User with email ${resultUser.email} created`,
          title: 'Success!',
        })
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (error) {
      // Handle errors
      toast({
        description: `❌ Try again later`,
        title: 'Error!',
      })
      console.log('Error trying to register user:', error)
    } finally {
      setIsFetching(false)
      resetFormState()
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onRegisterSubmit)}>
        <div className="grid">
          <div className="mb-4 grid">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              {...register('name')}
              placeholder="Your name"
              autoCapitalize="none"
              disabled={isFetching}
              autoComplete="name"
              className="mb-1.5"
              autoCorrect="off"
              type="text"
              id="name"
            />
            <p className="mb-2 text-xs leading-[1] text-red-400">
              {errors.name?.message}
            </p>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('email')}
              placeholder="email@example.com"
              autoCapitalize="none"
              disabled={isFetching}
              autoComplete="email"
              autoCorrect="off"
              className="mb-2"
              type="email"
              id="email"
            />
            <p className="mb-2 text-xs leading-[1] text-red-400">
              {errors.email?.message}
            </p>
            <Input
              {...register('password')}
              autoComplete="password"
              placeholder="Password"
              autoCapitalize="none"
              disabled={isFetching}
              autoCorrect="off"
              className="mb-2"
              type="password"
              id="password"
            />
            <p className="mb-2 text-xs leading-[1] text-red-400">
              {errors.password?.message}
            </p>
            <Input
              {...register('confirmPassword')}
              placeholder="Confirm password"
              autoComplete="password"
              autoCapitalize="none"
              disabled={isFetching}
              id="confirmPassword"
              autoCorrect="off"
              className="mb-2"
              type="password"
            />
            <p className="mb-2 text-xs leading-[1] text-red-400">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <Button disabled={isFetching} type="submit">
            {isFetching && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create account
          </Button>
        </div>
      </form>
    </div>
  )
}
