export type MetaType = {
  success: boolean
  code: number
  message: string
}

export type PageInfoType = {
  last_page: number
  current_page: number
  path: string
  total: number
}

export type SearchQueryType = {
  search?: string
  page?: string
  limit?: string
}
