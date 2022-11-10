import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isVisible: false,
    files: [],
}

export const uploadSlice = createSlice({
    name: 'file',
    initialState: initialState,
    reducers: {
        showUploader(state){
            state.isVisible = true
        },
        hideUploader(state){
            state.isVisible = false
        },
        addUploadFile(state, action){
            state.files.push(action.payload)
        },
        removeUploadFile(state, action){
            state.files = state.files.filter(file => file.id !== action.payload)
        },
        changeUploadFile(state, action){
           state.files = state.files.map(file => file.id === action.payload.id ? {...file, progress: action.payload.progress} : file)
        }
    },
})

export const {showUploader, hideUploader, addUploadFile, removeUploadFile, changeUploadFile} = uploadSlice.actions
export default uploadSlice.reducer