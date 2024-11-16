import { axiosBaseQuery } from '@/redux/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

const key = process.env.EXPO_PUBLIC_PIXABAY_API_KEY!
export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://pixabay.com/api' }),
  endpoints(build) {
    return {
      getImages: build.query<GetImagesResponse, GetImagesQueryArg>({
        query: ({ token, searchTerm, page = 1, perPage = 10 }) => ({
          url: `/?key=${token}${
            searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ''
          }&image_type=photo&pretty=true&per_page=${perPage}&page=${page}`,
          method: 'get'
        })
      })
    }
  }
})
export const { useGetImagesQuery } = imagesApi

export interface GetImagesQueryArg {
  token?: string | null
  searchTerm?: string
  page?: number
  perPage?: number
}

export interface GetImagesResponse {
  total: number
  totalHits: number
  hits: Hits[]
}

export interface Hits {
  id: number
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  fullHDURL: string
  imageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
  views: number
  downloads: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}
