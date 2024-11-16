import { imagesApi } from '@/redux/services/imagesApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    [imagesApi.reducerPath]: imagesApi.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat([imagesApi.middleware])
  }
})
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
