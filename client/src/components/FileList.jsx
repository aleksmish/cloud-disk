import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/fileList.css'
import File from './File'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function FileList() {
  const files = useSelector(state => state.file.files)
  const fileView = useSelector(state => state.file.view)
  
  if(!files.length) {
    return (
      <div className='loader'>Файлы не найдены</div>
    )
  }

  if(fileView === 'plate') {
    return (
      <div className="filePlate">
        {files.map((file) => (
            <File key={file._id} file={file} />
          ))}
      </div>
    )
  }

  if(fileView === 'list') {
    return (
      <div className="fileList">
        <div className="fileList__header">
          <div className="fileList__name">Название</div>
          <div className="fileList__date">Дата</div>
          <div className="fileList__size">Размер</div>
        </div> 
        <TransitionGroup>
        {files.map((file) => (
          <CSSTransition      
            key={file._id} 
            timeout={500}
            classNames={'file'}
            exit={false}
            >
            <File file={file} />
          </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  }

  
}

export default FileList
