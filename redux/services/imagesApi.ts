import { axiosBaseQuery } from '@/redux/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

const key = process.env.PIXABAY_API_KEY!

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://pixabay.com/api' }),
  endpoints(build) {
    return {
      getImages: build.query<GetImagesResponse, GetImagesQueryArg>({
        query: ({ searchTerm, page = 1, perPage = 10 }) => {
          const url = new URL(`/?key=${key}`)

          if (searchTerm) url.searchParams.set('q', encodeURIComponent(searchTerm))

          url.searchParams.set('per_page', String(perPage))
          url.searchParams.set('page', String(page))
          url.searchParams.set('image_type', 'photo')

          return { url: url.toString(), method: 'get' }
        }
      }),
      mutation: build.mutation({
        query: () => ({ url: '/mutation', method: 'post' })
      })
    }
  }
})
export const { useGetImagesQuery } = imagesApi

export interface GetImagesQueryArg {
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
