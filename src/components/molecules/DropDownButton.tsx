'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/DropdownMenu'
import { Button } from '@/components/atoms'

interface DropDownButtonProps {
  children: React.ReactNode
  lists: Array<{
    label: string
    onClick: (label: string) => void
  }>
  className?: string
  variant?: 'ghost' | 'secondary'
}

const itemClass = 'cursor-pointer items-center gap-1 font-semibold'

export default function DropDownButton({ children, lists, className, variant = 'ghost' }: DropDownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className={className}>
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {lists.map((list, index) => (
          <DropdownMenuItem onClick={() => list.onClick(list.label)} className={itemClass} key={index}>
            <p>{list.label}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
