import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Pagination, Search, Table } from '.'
import { useActions } from '../../hooks/useActions'
import { postsSelector } from '../../store/posts'
import { useAppSelector } from '../../store/store'
import { scrollToTop } from '../../utils/scrollToTop'
import './Posts.scss'

export default function Posts() {
  const { getPosts, setPostsPage, setPostsQuery } = useActions()
  const { posts, pagination, filter, status } = useAppSelector(postsSelector)
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )
  
  useEffect(() => {
    const pageParam = queryParams.get('_page')
    const queryParam = queryParams.get('q')

    if (pageParam) setPostsPage(+pageParam)
    if (queryParam) setPostsQuery(queryParam)
  }, [setPostsPage, setPostsQuery, queryParams])
  

  useEffect(() => {
    if (filter.query !== '') queryParams.set('q', filter.query)
    else queryParams.delete('q')

    if (pagination.currentPage > 1)
      queryParams.set('_page', `${pagination.currentPage}`)
    else queryParams.delete('_page')

    navigate(`?` + queryParams.toString())
  }, [navigate, queryParams, pagination.currentPage, filter])

  useEffect(() => {
    scrollToTop()
    getPosts()
  }, [getPosts, pagination.currentPage, filter])

  return (
    <div className="section users">
      <div className="container">
        <Search query={filter.query} />
        <Table posts={posts} status={status} />
        <Pagination pagination={pagination} />
      </div>
    </div>
  )
}
