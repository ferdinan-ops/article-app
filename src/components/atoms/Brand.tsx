import { Logo } from '@/assets'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface BrandProps {
  className?: string
  href?: string
}

export default function Brand({ className, href }: BrandProps) {
  return (
    <Link
      href={href ?? '/'}
      className={cn('flex items-center justify-center gap-3 font-semibold text-primary', className)}
    >
      <Image src={Logo} alt="logo" className="h-[40px] w-[40px] object-cover" />
      <span className="text-lg font-bold text-primary">Logo</span>
    </Link>
  )
}
