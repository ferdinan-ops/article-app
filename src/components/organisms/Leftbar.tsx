'use client'
import { MAIN_MENU } from '@/lib/menu'

import { Brand, Button, Image } from '@/components/atoms'
import { ActiveLink } from '@/components/molecules'
import { Hamburger } from '@/assets'

export default function Leftbar() {
  return (
    <aside className="fixed top-0 z-50 hidden h-screen w-64 border-r border-[#E9E9E9] bg-white text-primary transition-transform duration-300 md:block lg:sticky">
      <Button className="mb-[53px] ml-[50px] mt-7 h-fit rounded-full p-0" variant="ghost">
        <Image src={Hamburger} alt="hamburger" />
      </Button>
      <nav className="flex flex-col gap-4 px-4 py-5">
        <Brand className="hidden gap-3 p-1 text-primary lg:flex lg:gap-3.5" />
        <div className="text-foreground mt-8 flex flex-col gap-3">
          {MAIN_MENU.map(({ href, title, icon }, index) => (
            <ActiveLink href={href} name={title} icon={icon} key={index} />
          ))}
        </div>
      </nav>
    </aside>
  )
}
