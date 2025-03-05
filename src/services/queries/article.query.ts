import { useMutation, useQuery, useQueryClient } from 'react-query'

import { createArticleFn, deleteArticleFn, getArticlesFn, updateArticleFn } from '../api/article.api'

import { SearchQueryType } from '@/types/meta.type'
import { toast } from '@/hooks/useToast'

export const useGetArticles = (query: SearchQueryType) => {
  return useQuery(['articles', query.page, query.search, query.limit], async () => getArticlesFn(query))
}

export const useCreateArticle = () => {
  const queryclient = useQueryClient()
  return useMutation(createArticleFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('articles')
      toast({
        title: 'Process Success',
        description: 'Your article has been created successfully'
      })
    }
  })
}

export const useDeleteArticle = () => {
  const queryclient = useQueryClient()
  return useMutation(deleteArticleFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('articles')
      toast({
        title: 'Process Success',
        description: 'Your article has been deleted successfully'
      })
    }
  })
}

export const useUpdateArticle = () => {
  const queryclient = useQueryClient()
  return useMutation(updateArticleFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('articles')
      toast({
        title: 'Process Success',
        description: 'Your article has been updated successfully'
      })
    }
  })
}
