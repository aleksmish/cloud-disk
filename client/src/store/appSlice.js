import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loader: false,
}

export const fileSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        showLoader(state, action) {
            state.loader = true
        },
        hideLoader(state, action) {
            state.loader = false
        }
    },
})

export const {showLoader, hideLoader} = fileSlice.actions
export default fileSlice.reducer