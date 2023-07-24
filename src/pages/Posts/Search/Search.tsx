import { useRef, useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import { SearchSVG } from '../../../common/svg'
import { useActions } from '../../../hooks/useActions'

interface IProps {
  query: string
}

export default function Search({ query }: IProps) {
  const { setPostsQuery, setPostsPage } = useActions()
  const [searchValue, setSearchValue] = useState<string>(query)
  const searchRef = useRef<HTMLFormElement>(null)

  function SearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    if (e.target.value === '') {
      setPostsQuery('')
    }
  }

  function searchClick() {
    if (searchValue !== '') {
      setSearchValue(searchValue)
      setPostsQuery(searchValue)
      setPostsPage(1)
    }
  }

  return (
    <form ref={searchRef} className="users__search search">
      <div className="search__field">
        <input
          onChange={SearchValueChange}
          value={searchValue}
          type="text"
          placeholder="Поиск"
          required
        />
        <button onClick={searchClick} type="button">
          <SearchSVG />
        </button>
      </div>
    </form>
  )
}
