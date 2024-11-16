import { axiosBaseQuery } from '@/redux/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      login: build.mutation<LoginResponse, LoginPayload>({
        query: ({ username, password }) => ({
          url: '/api/login',
          method: 'post',
          data: { username, password }
        })
      })
    }
  }
})
export const { useLoginMutation } = loginApi

interface LoginResponse {
  token: string
}
interface LoginPayload {
  username: string
  password: string
}
