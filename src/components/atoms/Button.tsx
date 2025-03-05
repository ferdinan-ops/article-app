'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { ImSpinner2 } from 'react-icons/im'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        destructive: 'bg-red-500 text-zinc-50 hover:bg-red-500/90',
        outline: 'border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900',
        secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80',
        ghost: 'hover:bg-zinc-100 hover:text-zinc-900',
        link: 'text-zinc-900 underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const loadingVariants = cva('flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full', {
  variants: {
    variant: {
      default: 'text-white',
      destructive: 'text-zinc-50',
      outline: 'text-zinc-900',
      secondary: 'text-zinc-50',
      ghost: 'text-zinc-900',
      link: 'text-zinc-900'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'pointer-events-none disabled:text-transparent'
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {props.children}
        {loading && (
          <div className={cn(loadingVariants({ variant }))}>
            <ImSpinner2 className="m-auto animate-spin" />
          </div>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
