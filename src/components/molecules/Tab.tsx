'use client'
import { Image } from '../atoms'
import { Article, ArticleNonActive } from '@/assets'
import { cn } from '@/lib/utils'

interface TabProps {
  active: boolean
  className?: string
  title: string
  subtitle: string
  onClick?: () => void
}

const Tab = ({ active, className, title, subtitle, onClick }: TabProps) => {
  return (
    <button
      className={cn(
        'flex cursor-pointer gap-4 px-3 py-3 hover:bg-primary/5 md:py-4',
        active ? 'border-b-2  border-primary text-primary' : 'text-slate-400',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div>
          <Image src={active ? Article : ArticleNonActive} alt="article-icon" className="h-10 w-10" />
        </div>
        <div className="flex flex-col justify-start text-left">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs">{subtitle}</p>
        </div>
      </div>
    </button>
  )
}

export default Tab
