import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createDir } from '../http/fileApi'
import { addFile, setPopupDisplay } from '../store/fileSlice'

function Popup() {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.file.popupDisplay)
    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch()

    const createHandler = () => {
        if(dirName){
            dispatch(createDir(currentDir, dirName))
            setDirName('')
            dispatch(setPopupDisplay('none'))
        }
    }   

    return (
        <div className='popup' style={{display: popupDisplay}} onClick={() => dispatch(setPopupDisplay('none'))}>
            <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">
                        Создать новую папку
                    </div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                <input type='text' placeholder='Введите название папки...' value={dirName} onChange={e => setDirName(e.target.value)}/>
                <button className="popup__create" onClick={() => createHandler()}>Создать</button>
            </div>
        </div>
    )
}

export default Popup