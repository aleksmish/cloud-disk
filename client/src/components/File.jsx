import React from 'react'
import '../styles/file.css'
import {AiFillFile, AiFillFolder} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurDir } from '../store/fileSlice'
import { BiDownload } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { deleteFile, downloadFile } from '../http/fileApi'
import sizeFormat from '../utils/sizeFormat'

function File({file}) {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.file.currentDir)
  const fileView = useSelector(state => state.file.view)

  const openDirHandler = () => {
    dispatch(pushToStack(currentDir))
    dispatch(setCurDir(file._id))
  }

  const downloadClickHandler = (e) => {
    e.stopPropagation()
    downloadFile(file)
  }

  const deleteHandler = (e) => {
    e.stopPropagation()
    dispatch(deleteFile(file))
  }

  if(fileView === 'list') {
    return (
      <div className='file' onClick={file.type === 'dir' ? () => openDirHandler() : null}>
          <div className='file__img'>{file.type === 'dir' ? <AiFillFolder/> : <AiFillFile/>}</div>
          <div className="file__name">{file.name}</div>
          <div className="file__date">{file.date?.slice(0, 10)}</div>
          <div className="file__size">{sizeFormat(file.size)}</div>
          {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className='file__btn file__download'><BiDownload/></button>}
          <button onClick={(e) => deleteHandler(e)} className='file__btn file__delete'><AiOutlineDelete/></button>
      </div>
    )
  }

  if(fileView === 'plate') {
    return (
      <div className='file-plate' onClick={file.type === 'dir' ? () => openDirHandler() : null}>
          <div className='file-plate__img'>{file.type === 'dir' ? <AiFillFolder size={100}/> : <AiFillFile size={100}/>}</div>
          <div className="file-plate__name">{file.name}</div>
          <div className="file-plate__btns">
            {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className='file-plate__btn file-plate__download'><BiDownload /></button>}
            <button onClick={(e) => deleteHandler(e)} className='file-plate__btn file-plate__delete'><AiOutlineDelete /></button>
          </div>
      </div>
    )
  }
  
}

export default File