import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface YTVideo {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      high: {
        url: string
      }
    }
  }
}

export interface LocalVideo {
  image: string
  title: string
  description: string
  id: string
}

export interface videoListState {
  value: { [key: string]: LocalVideo }
}

const initialState: videoListState = {
  value: {},
}

export const videosListSlice = createSlice({
  name: 'videosList',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<LocalVideo>) => {
      state.value[action.payload.id] = action.payload
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.value[action.payload]
    },
    reset: (state) => {
      state.value = initialState.value
    },
  },
})

export const { add, remove, reset } = videosListSlice.actions

export default videosListSlice.reducer
