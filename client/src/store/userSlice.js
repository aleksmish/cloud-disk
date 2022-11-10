import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isAuth: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isAuth = true
    },
    logout(state, action) {
      localStorage.removeItem('token')
      state.user = {}
      state.isAuth = false
    }
  }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer