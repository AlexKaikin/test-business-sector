import { ArrowBottomSVG } from '../../../common/svg'
import { useActions } from '../../../hooks/useActions'
import { IPost } from '../../../types/post'

interface IProps {
  posts: IPost[]
  status: string
}

export default function Table({ posts, status }: IProps) {
  const { setPostsSort } = useActions()

  if (!posts.length && status === 'success')
    return <div className="fade-in">Не найдено</div>

  return (
    <table className="users__table">
      <thead>
        <tr>
          <th onClick={() => setPostsSort('id')}>
            ID <ArrowBottomSVG />
          </th>
          <th onClick={() => setPostsSort('title')}>
            Заголовок <ArrowBottomSVG />
          </th>
          <th onClick={() => setPostsSort('body')}>
            Описание <ArrowBottomSVG />
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id} className="fade-in">
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
