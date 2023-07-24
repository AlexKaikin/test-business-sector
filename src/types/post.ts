export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export interface IPostsState {
  posts: IPost[]
  pagination: IPagination
  filter: IFilter
  status: string
}

export type IPagination = {
  pagesCount: number
  totalItems: number
  limitItems: number
  currentPage: number
}

export type IFilter = {
  sortTitle: string
  sortMethod: string
  query: string
}
