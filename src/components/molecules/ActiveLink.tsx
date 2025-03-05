'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconType } from 'react-icons'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface ActiveLinkProps {
  name: string
  href: string
  icon: IconType
  action?: () => void
}

export default function ActiveLink({ name, href, icon: Icon, action }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={action}
      className={cn(
        'relative flex items-center gap-3.5 overflow-hidden rounded-lg py-4 pl-7 pr-2',
        isActive ? 'bg-primary/5' : 'hover:bg-primary/10'
      )}
    >
      <Icon className="text-xl" />
      <span className="truncate-1 text-sm font-semibold">{name}</span>
      {isActive && <div className="absolute left-0 top-1/2 h-full w-1 -translate-y-1/2 bg-primary" />}
    </Link>
  )
}
