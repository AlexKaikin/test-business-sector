import cn from 'classnames'
import { IPagination } from '../../types/post'
import './PaginationCreator.scss'

type PropsType = {
  pagination: IPagination
  changePage: (number: number) => void
}

export default function PaginationCreator({
  pagination,
  changePage,
}: PropsType) {
  const { pagesCount, currentPage } = pagination
  const pages: number[] = createPages(pagesCount, currentPage)
  const prevPage = currentPage > 1 ? currentPage - 1 : 1
  const nextPage = currentPage < pagesCount ? currentPage + 1 : pages.length

  function createPages(pagesCount: number, currentPage: number) {
    const pages = []
    if (pagesCount > 5) {
      if (currentPage > 4) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  if (pages.length < 2) return null

  return (
    <div className="pagination">
      <button onClick={() => changePage(prevPage)} className="page">
        Назад
      </button>
      <div className="page-numbers">
        {pages?.map(page => (
          <button
            key={page}
            onClick={() => currentPage !== page && changePage(page)}
            className={cn('page', { active: currentPage === page })}
          >
            {page}
          </button>
        ))}
      </div>
      <button onClick={() => changePage(nextPage)} className="page">
        Далее
      </button>
    </div>
  )
}
