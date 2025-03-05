import { create } from 'zustand'

import { ArticleType } from '@/types/article.type'

interface ArticleStore {
  article: ArticleType
  storeArticle: (article: ArticleType) => void
  removeArticle: () => void
}

export const useArticle = create<ArticleStore>((set) => ({
  article: {} as ArticleType,
  storeArticle: (article) => set({ article }),
  removeArticle: () => set({ article: {} as ArticleType })
}))
