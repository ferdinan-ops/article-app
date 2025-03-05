import { AuthorType } from './author.type'
import { MetaType, PageInfoType } from './meta.type'

export type ArticleType = {
  id: number
  title: string
  content: string
  author: AuthorType
  status: string
  created_at: string
  updated_at: string
  like_count: string
  dislike_count: string
}

export type ArticlePayload = {
  title: string
  content: string
}

export type ArticleUpdatePayload = ArticlePayload & { id: number }

export type ArticleResponse = {
  meta: MetaType
  data: {
    articles: ArticleType[]
    page_info: PageInfoType
  }
}
