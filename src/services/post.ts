import { api } from '../config/api'
import { IFilter, IPagination, IPost } from '../types/post'

export const postService = {
  getAll(filter: IFilter, pagination: IPagination) {
    const { currentPage, limitItems } = pagination
    const { query, sortTitle, sortMethod } = filter
    const $q = query === '' ? `` : `q=${query}`
    const $pagination = `&_page=${currentPage}&_limit=${limitItems}`
    const $sorting =
      sortTitle === `` ? '' : `&_sort=${sortTitle}&_order=${sortMethod}`

    return api.get<IPost[]>(
      `posts/?${$q + $sorting + $pagination}`
    )
  },
}
