import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { postService } from '../services/post'
import { IPost, IPostsState } from '../types/post'
import { RootState } from './store'

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: IPostsState = {
  posts: [],

  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 10,
    currentPage: 1,
  },

  filter: {
    sortTitle: '',
    sortMethod: 'asc',
    query: '',
  },

  status: Status.Loading,
}

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload
      state.status = Status.Success
    },

    setPostsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },

    setPostsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },

    setPostsSort: (state, action: PayloadAction<string>) => {
      state.filter.sortTitle = action.payload
      state.filter.sortMethod =
        state.filter.sortMethod === 'asc' ? 'desc' : 'asc'
    },

    setPostsQuery: (state, action: PayloadAction<string>) => {
      state.filter.query = action.payload
    },

    setPostsStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },

    setPostsFilterDefault: state => {
      state.filter = {
        sortTitle: '',
        sortMethod: 'asc',
        query: '',
      }
    },
  },
})

export const {
  setPosts,
  setPostsTotalItems,
  setPostsPage,
  setPostsSort,
  setPostsQuery,
  setPostsStatus,
} = posts.actions

export default posts.reducer

export const postsSelector = (state: RootState) => state.posts

export const getPosts =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setPostsStatus(Status.Loading))
    try {
      const res = await postService.getAll(
        getState().posts.filter,
        getState().posts.pagination
      )
      dispatch(setPosts(res.data))
      res.headers['x-total-count'] &&
        dispatch(setPostsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setPostsStatus(Status.Error))
      console.log(err)
    }
  }

export const postsActions = { ...posts.actions, getPosts }
