'use client'

import { ArticleBrowse, ArticleForm } from '@/components/sections'
import { Tab } from '@/components/molecules'
import { Loading } from '@/components/atoms'

import { useArticle, useTab } from '@/store'
import * as React from 'react'

const renderTabs = (tabActive: number) => {
  switch (tabActive) {
    case 1:
      return <ArticleBrowse />
    case 2:
      return <ArticleForm />
    default:
      return <ArticleBrowse />
  }
}

export default function Home() {
  const removeArticle = useArticle((state) => state.removeArticle)
  const { tabActive, changeTabActive } = useTab((state) => ({
    tabActive: state.tabActive,
    changeTabActive: state.changeTabActive
  }))

  const handleChangeTab = (tab: number) => {
    removeArticle()
    changeTabActive(tab)
  } 

  return (
      <div className="flex flex-1 flex-col gap-5">
        <section className="flex items-center justify-between">
          <div className="flex w-full border-b border-slate-300">
            <Tab
              active={tabActive === 1}
              title="Article"
              subtitle="List Article"
              className="w-full md:w-[259px]"
              onClick={() => handleChangeTab(1)}
            />
            <Tab
              active={tabActive === 2}
              title="Add / Edit"
              subtitle="Detail Article"
              className="w-full md:w-[259px]"
              onClick={() => handleChangeTab(2)}
            />
          </div>
        </section>
        <section className="flex max-w-[calc(100vw-32px)] flex-1 flex-col rounded-lg bg-white p-5 md:max-w-none">
          <React.Suspense key={tabActive} fallback={<Loading />}>
            {renderTabs(tabActive)}
          </React.Suspense>
        </section>
      </div>
  )
}
