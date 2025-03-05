'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Membuat breadcrumbs dari path
  const generateBreadcrumbs = () => {
    const pathArray = pathname.split('/').filter((path) => path)
    return pathArray.map((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/')
      return { name: path, href }
    })
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="mt-[3px] flex items-center gap-3 text-lg font-semibold md:text-xl">
      <Link href="/" className="text-black">
        Article
      </Link>
      {breadcrumbs.length > 0 && <span className="text-black/40">/</span>}
      {breadcrumbs.map(({ name, href }, index) => (
        <React.Fragment key={index}>
          <Link href={href} className={cn(index !== breadcrumbs.length - 1 && 'text-black/40')}>
            {decodeURIComponent(name)}
          </Link>
          {index < breadcrumbs.length - 1 && <span className="text-black/40">/</span>}
        </React.Fragment>
      ))}
    </div>
  )
}
