import api from '@/lib/api'

import { ArticlePayload, ArticleResponse, ArticleUpdatePayload } from '@/types/article.type'
import { SearchQueryType } from '@/types/meta.type'

export const getArticlesFn = async (query: SearchQueryType): Promise<ArticleResponse> => {
  const response = await api.get('/articles', {
    params: {
      ...query,
      page_size: query.limit || 10
    }
  })
  return response.data
}

export const createArticleFn = async (article: ArticlePayload) => {
  return await api.post('/articles', article)
}

export const deleteArticleFn = async (id: number) => {
  return await api.delete(`/articles/${id}`)
}

export const updateArticleFn = async (article: ArticleUpdatePayload) => {
  const { id, ...rest } = article
  return await api.put(`/articles/${id}`, rest)
}
