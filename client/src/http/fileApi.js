import { hideLoader, showLoader } from '../store/appSlice'
import { addFile, deleteFileAction, setFiles } from '../store/fileSlice'
import { addUploadFile, changeUploadFile, showUploader } from '../store/uploadSlice'
import {$host} from './index'

export function getFiles(dirId, sort) {
    return async dispatch =>{
        try{
            dispatch(showLoader())
            let url = `api/files`
            if(dirId && sort) {
                url = `api/files?parent=${dirId}&sort=${sort}`
            }
            else if(dirId) {
                url = `api/files?parent=${dirId}`
            }
            else if(sort) {
                url = `api/files?sort=${sort}`
            }

            const response = await $host.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        }
        catch(e){
            alert(e.response.data.message)
        }
        finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try{
            const response = await $host.post(`api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            },
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        }
        catch(e){
            alert(e.response.data.message)
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try{
            const formData = new FormData()
            formData.append('file', file)
            if(dirId){
                formData.append('parent', dirId)
            }
    
            let fileToUpload = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader())
            dispatch(addUploadFile(fileToUpload))

            const response = await $host.post(`api/files/upload`, formData,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    fileToUpload = {...fileToUpload, progress: parseInt(progressEvent.progress * 100)}
                    dispatch(changeUploadFile(fileToUpload))
                }
            })
            dispatch(addFile(response.data))
        }
        catch(e){
            alert(e.response?.data?.message)
        }
    }
}

export async function downloadFile(file) {
    const blob = await $host.get(`api/files/download?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        responseType: 'blob',
    })
    
    if(blob.status === 200) {
        const downloadUrl = URL.createObjectURL(blob.data)
        console.log(downloadUrl)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try{
            const response = await $host.delete(`api/files?id=${file._id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
           })
           dispatch(deleteFileAction(file._id))
           alert(response.data.message)
        }
        catch(e){
            alert(e.response?.data?.message)
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try{
            const response = await $host.get(`api/files/search?search=${search}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
           })
           dispatch(setFiles(response.data))
        }
        catch(e){
            alert(e.response?.data?.message)
        }
        finally {
            dispatch(hideLoader())
        }
    }
}