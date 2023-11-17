'use client'

import { type TLoginForm, LoginFormSchema } from '@/lib/schemaTypes'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { type FieldValues, useForm } from 'react-hook-form'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { type HTMLAttributes, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { parseAsync } from 'valibot'
import { cn } from '@/lib/utils'

interface AuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export default function AuthForm({ className, ...props }: AuthFormProps) {
  const {
    formState: { errors },
    reset: resetFormState,
    handleSubmit,
    register,
  } = useForm<TLoginForm>({
    resolver: valibotResolver(LoginFormSchema),
    mode: 'onSubmit',
  })
  const [isFetching, setIsFetching] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (formData: FieldValues) => {
    try {
      setIsFetching(true)
      const { password, email } = await parseAsync(LoginFormSchema, formData)
      const response = await signIn('credentials', {
        redirect: false,
        password,
        email,
      })
      if (response?.ok) {
        toast({
          description: `✅ You have successfully logged in`,
          title: 'Success!',
        })
        router.push('/')
      } else {
        toast({
          description: `Failed to log in...`,
          title: 'Oops!',
        })
      }
      console.log(response)
    } catch (error) {
      // Handle errors
      toast({
        description: `❌ Try again later`,
        title: 'Error!',
      })
      console.log('Error trying to login:', error)
    } finally {
      setIsFetching(false)
      resetFormState()
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="mb-4 grid">
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
            <Input
              {...register('password')}
              autoComplete="password"
              placeholder="password"
              autoCapitalize="none"
              disabled={isFetching}
              autoCorrect="off"
              type="password"
              id="password"
            />
          </div>
          <Button disabled={isFetching}>
            {isFetching && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button disabled={isFetching} variant="outline" type="button">
        {isFetching ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  )
}
