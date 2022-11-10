import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../http/userApi'
import { setUser } from '../store/userSlice'
import '../styles/authorization.css'
import Input  from '../utils/input/Input'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const loginHandler = async(e, email, password) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <form className='authorization'>
            <div className="authorization__header">Логин</div>
            <label htmlFor="email">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Введите email" name="email" />
            <label htmlFor="psw">Пароль</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Введите пароль" name="psw"/>
            <button className="authorization__button" onClick={(e) => loginHandler(e, email, password)}>Войти</button>
        </form>
    )
}
