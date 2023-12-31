import React from 'react'
import PaginationCreator from '../../../common/PaginationCreator/PaginationCreator'
import { useActions } from '../../../hooks/useActions'
import { IPagination } from '../../../types/post'

type PropsType = {
  pagination: IPagination
}

function Pagination({ pagination }: PropsType) {
  const { setPostsPage } = useActions()

  function changePage(number: number) {
    setPostsPage(number)
  }

  return <PaginationCreator changePage={changePage} pagination={pagination} />
}

export default React.memo(Pagination)
