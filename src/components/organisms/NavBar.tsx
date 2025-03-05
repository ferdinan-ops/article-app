'use client'
import * as React from 'react'
import { HiBell, HiChevronDown } from 'react-icons/hi2'

import { Breadcrumbs, DropDownButton } from '@/components/molecules'
import { Image, Button } from '../atoms'
import { Indonesia, Profile, UnitedKingdom } from '@/assets'

const languages = ['English', 'Indonesia']
const profiles = ['Articles', 'Logout']

export default function NavBar() {
  const [language, setLanguage] = React.useState('English')

  return (
    <header className="sticky left-0 right-0 top-0 z-10 flex h-20 w-full items-center border-b border-[#E9E9E9] bg-white">
      <div className="flex w-full items-center justify-between px-4 md:px-10">
        <nav className="flex items-center gap-3 pl-1">
          <Breadcrumbs />
        </nav>
        <nav className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center">
            <DropDownButton lists={languages.map((lang) => ({ label: lang, onClick: () => setLanguage(lang) }))}>
              <Image src={language === 'English' ? UnitedKingdom : Indonesia} alt="flag" className="h-5 w-5" />
              <HiChevronDown className="text-xs md:text-xs" />
            </DropDownButton>
            <Button variant="ghost" size="icon" className="relative">
              <div className="absolute right-3.5 top-3 h-1.5 w-1.5 rounded-full bg-red-500" />
              <HiBell className="text-xl text-primary" />
            </Button>
          </div>
          <div className="h-8 w-[1px] bg-[#C4C4C4]/80" />
          <DropDownButton lists={profiles.map((lang) => ({ label: lang, onClick: () => {} }))}>
            <Image src={Profile} alt="profile" className="h-6 w-6" />
            <HiChevronDown className="text-xs md:text-xs" />
          </DropDownButton>
        </nav>
      </div>
    </header>
  )
}
