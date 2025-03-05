import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ImageProps {
  src: string
  className?: string
  alt: string
}
export default function ImageSource({ src, alt, className }: ImageProps) {
  return <Image alt={alt} src={src} className={cn('object-cover', className)} />
}
