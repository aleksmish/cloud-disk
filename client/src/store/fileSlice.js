import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack: [],
    view: 'list',
}

export const fileSlice = createSlice({
    name: 'file',
    initialState: initialState,
    reducers: {
        setFiles(state, action){
            state.files = action.payload
        },
        setCurDir(state, action){
            state.currentDir = action.payload
        },
        addFile(state,action){
            state.files.push(action.payload)
        },
        setPopupDisplay(state, action){
            state.popupDisplay = action.payload
        },
        pushToStack(state, action){
            state.dirStack.push(action.payload)
        },
        deleteFileAction(state, action){
            state.files = state.files.filter(file => file._id !== action.payload)
        },
        popFromStack(state, action){
            state.dirStack.pop()
        },
        setView(state, action){
            state.view = action.payload
        }
    },
})

export const {setFiles, setCurDir, addFile, setPopupDisplay, pushToStack, deleteFileAction, popFromStack, setView} = fileSlice.actions
export default fileSlice.reducer