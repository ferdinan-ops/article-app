'use client'

import Dialog, { DialogOptions } from '@/components/organisms/Dialog'
import { useDialog } from '@/store'
import { Toaster } from '@/components/organisms'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { dialogOptions, handleClose, handleSubmit } = useDialog()

  return (
    <>
      <Dialog
        open={Boolean(dialogOptions)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...(dialogOptions as DialogOptions)}
      />
      <Toaster />
      {children}
    </>
  )
}
