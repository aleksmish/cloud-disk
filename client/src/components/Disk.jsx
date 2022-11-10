import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getFiles, uploadFile } from '../http/fileApi'
import { popFromStack, setCurDir, setPopupDisplay, setView } from '../store/fileSlice'
import '../styles/disk.css'
import FileList from './FileList'
import Popup from './Popup'
import { IoCloudDownload } from 'react-icons/io5'
import Uploader from './Uploader'
import { CgTemplate as PlateIcon, CgList as ListIcon } from 'react-icons/cg'

function Disk() {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')    
    const loader = useSelector(state => state.app.loader)

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    const showPopupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        const backDirId = dirStack[dirStack.length - 1]
        dispatch(popFromStack())
        dispatch(setCurDir(backDirId))
    }

    const fileUploadHandler = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    if(loader) {
        return (
            <div className='loader'>
               <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return ( !dragEnter ?
        <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
                <div className='disk__upload'>
                    <label htmlFor='disk__upload-input' className='disk__upload-label'><IoCloudDownload/>Загрузить файл</label>
                    <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" id="disk__upload-input" className='disk__upload-input' />
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)} className='disk__select'>
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                </select>
                <button className="disk__plate" onClick={() => dispatch(setView('plate'))}><PlateIcon/></button>
                <button className="disk__list" onClick={() => dispatch(setView('list'))}><ListIcon/></button>
            </div>
            <FileList/>
            <Popup/>
            <Uploader/>
        </div>
        :
        <div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >
            Перетащите файл сюда
        </div>
    )
}

export default Disk