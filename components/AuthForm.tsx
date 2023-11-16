'use client'

import { type HTMLAttributes, type SyntheticEvent, useState } from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export default function AuthForm({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid">
          <div className="mb-4 grid">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              defaultValue="elon.musk@spacex.com"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              disabled={isLoading}
              autoCorrect="off"
              className="mb-2"
              type="email"
              id="email"
            />
            <Input
              defaultValue="BuyDogeOrYouWillBeFired1234"
              autoComplete="password"
              placeholder="password"
              autoCapitalize="none"
              disabled={isLoading}
              autoCorrect="off"
              type="password"
              id="password"
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        disabled={isLoading}
        onClick={onSubmit}
        variant="outline"
        type="button"
      >
        {isLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  )
}
