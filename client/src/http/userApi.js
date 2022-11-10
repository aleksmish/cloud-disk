import { setUser } from '../store/userSlice'
import { $host } from './index'

export const registration = async(email, password) => {
    try{
        const response = await $host.post("api/auth/registration", {
            email,
            password
        })
        alert(response.data.message)
    }
    catch(e){
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try{
            const response = await $host.post("api/auth/login", {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        }
        catch(e){
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try{
            const response = await $host.get("api/auth/auth", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        }
        catch(e){
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try{
            const formData = new FormData()
            formData.append('file', file)
            const response = await $host.post("api/files/avatar", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(response.data))
        }
        catch(e){
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try{
            const response = await $host.delete("api/files/avatar", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(response.data))
        }
        catch(e){
            console.log(e)
        }
    }
}