'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      value={props.value ?? ''}
      className={cn(
        'focus-visible:none flex h-10 w-full rounded-md border-none bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-500 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
