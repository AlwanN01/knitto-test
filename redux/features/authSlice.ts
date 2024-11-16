import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null as string | null
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    clearToken(state) {
      state.token = null
    }
  }
})

export const { setToken, clearToken } = authSlice.actions
export const selectToken = (state: any) => state.auth.token
