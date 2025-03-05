'use client'
import { useDisableBodyScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms'
import * as React from 'react'
import { HiCheck, HiOutlineTrash } from 'react-icons/hi2'

export interface DialogOptions {
  title: string
  description: string
  variant: 'success' | 'danger'
  submitText: string
  isLoading?: boolean
  catchOnCancel?: boolean
}

interface BaseDialogProps extends DialogOptions {
  open: boolean
  onSubmit: () => void
  onClose: () => void
}

export default function Dialog({ open, onSubmit, onClose, ...rest }: BaseDialogProps) {
  const { title, description, variant, submitText, isLoading } = rest

  useDisableBodyScroll(open)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (variant === 'success') {
        onSubmit()
      }
    }, 1500)

    return () => {
      clearTimeout(timeout)
    }
  }, [variant, onSubmit])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999999] flex items-end justify-center p-4 transition-colors md:items-center',
        open ? 'visible bg-gray-900/75' : 'invisible'
      )}
    >
      <div
        className={cn(
          'max-w-[386px] overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex flex-col items-center gap-4 px-4 pb-4 pt-5 md:flex-row md:items-start md:gap-5 md:p-6">
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center rounded-full hover:bg-slate-200',
              'h-12 w-12 flex-shrink-0 cursor-auto text-2xl',
              variant === 'danger' && 'bg-[#F7F7F7] text-red-600 hover:bg-[#F7F7F7]',
              variant === 'success' && 'bg-green-100 text-green-600 hover:bg-green-100'
            )}
          >
            {variant === 'danger' && <HiOutlineTrash />}
            {variant === 'success' && <HiCheck />}
          </div>
          <div className="mt-1 text-center md:text-left">
            <h3 className="text-font text-base font-bold capitalize leading-6 md:text-lg">{title}</h3>
            <p className="mt-2 text-[13px] font-normal text-gray-500 md:text-sm">{description}</p>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center gap-2 px-4 py-3 md:flex-row md:justify-end md:gap-3 md:px-6">
          <Button variant="ghost" className="w-full px-6 text-[#9E9D9D] md:w-fit md:text-xs" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-full px-6 capitalize md:w-fit md:text-xs"
            onClick={onSubmit}
            variant={variant === 'danger' ? 'destructive' : 'default'}
            loading={isLoading}
          >
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  )
}
