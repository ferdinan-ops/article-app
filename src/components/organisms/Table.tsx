'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { Input, InputProps } from '@/components/atoms/Input'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border', className)} {...props} />
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-zinc-100/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100', className)}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  position?: 'center' | 'left' | 'right'
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, position, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 border px-4 text-left align-middle font-semibold text-[#1c1c1c]/40 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  >
    <div
      className={cn(
        'w-max',
        position === 'left' && '',
        position === 'center' && 'mx-auto',
        position === 'right' && 'ml-auto',
        className
      )}
    >
      {props.children}
    </div>
  </th>
))
TableHead.displayName = 'TableHead'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  position?: 'center' | 'left' | 'right'
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, position, ...props }, ref) => (
  <td ref={ref} className={cn('border p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props}>
    <div
      className={cn(
        'truncate-1 w-max',
        position === 'left' && '',
        position === 'center' && 'mx-auto',
        position === 'right' && 'ml-auto',
        className
      )}
    >
      {props.children}
    </div>
  </td>
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-zinc-500', className)} {...props} />
  )
)
TableCaption.displayName = 'TableCaption'

interface TableSearchProps extends InputProps {
  containerClassName?: string
}

// eslint-disable-next-line react/display-name
const TableSearch = React.forwardRef<HTMLInputElement, TableSearchProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('relative', containerClassName)}>
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 transform text-[#8897AD]" />
        <Input
          {...props}
          ref={ref}
          className={cn(
            'border-none pl-10 outline-none ring-0 placeholder:text-[13px] placeholder:text-[#8897AD] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            className
          )}
        />
      </div>
    )
  }
)

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, TableSearch }
