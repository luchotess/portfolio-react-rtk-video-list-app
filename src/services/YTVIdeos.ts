// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { YTVideo } from '../resources/videoList/videosListSlice.ts'

export const YTVideosApi = createApi({
  reducerPath: 'YTVideosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/youtube/v3/search',
  }),
  endpoints: (builder) => ({
    getVideos: builder.query<YTVideo[], string>({
      query: (search) => `?q=${search}&part=snippet&key=${import.meta.env.VITE_YT_API_TOKEN}`,
      transformResponse: (response: { items: YTVideo[] }) => response.items,
    }),
  }),
})

export const { useGetVideosQuery } = YTVideosApi
