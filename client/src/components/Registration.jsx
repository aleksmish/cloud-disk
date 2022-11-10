import React from 'react'
import { useState } from 'react'
import { registration } from '../http/userApi'
import '../styles/authorization.css'
import Input from '../utils/input/Input'

export default function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form className="authorization">
            <div className="authorization__header">Регистрация</div>
            <label htmlFor="email">Email</label>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Введите email"
                name="email"
            />
            <label htmlFor="psw">Пароль</label>
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Введите пароль"
                name="psw"
            />
            <button
                className="authorization__button"
                onClick={(e) => {
                    e.preventDefault()
                    registration(email, password)
                }}
            >
                Зарегистрироваться
            </button>
        </form>
    )
}
