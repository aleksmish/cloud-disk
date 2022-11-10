import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAvatar, uploadAvatar } from '../http/userApi'
import { AiOutlineUser as DefaultAvatar } from 'react-icons/ai'
import '../styles/profile.css'

export default function Profile() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.user)

  function changeHandler(e) {
    const file = e.target.files[0]
    dispatch(uploadAvatar(file))
  }


  return (
    <div className='profile'>
      {currentUser.avatar ? 
        <img className="profile__avatar" src={process.env.REACT_APP_API_URL + currentUser.avatar} alt='avatar'/> 
      :
        <DefaultAvatar size={100}/>
      } 
      <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
      <label htmlFor="upload" className='profile__upload'>Загрузить аватар</label>
      <input accept='image/*' className='profile__upload-input' id="upload" onChange={e => changeHandler(e)} type="file"/>
    </div>
  )
}
