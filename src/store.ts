import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import videoListReducer from './resources/videoList/videosListSlice.ts'
import { YTVideosApi } from './services/YTVIdeos'

export const store = configureStore({
  reducer: {
    [YTVideosApi.reducerPath]: YTVideosApi.reducer,
    videoList: videoListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(YTVideosApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
