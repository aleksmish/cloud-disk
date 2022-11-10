const fs = require('fs')

class FileService {
    createDir(req, file) {
        const filePath = this.getPath(req, file)
        return new Promise((res, rej) => {
            try {
                if (!fs.existsSync(file)) {
                    fs.mkdirSync(filePath)
                    return res({ message: 'File was successfully created' })
                } else {
                    return rej({ message: 'File already exists' })
                }
            } catch (e) {
                return rej({ message: 'File Error' })
            }
        })
    }

    deleteFile(req, file){
        const path = this.getPath(req, file)
        if(file.type === 'dir'){
            fs.rmdirSync(path)
        }
        else{
            fs.unlinkSync(path)
        }
    }

    getPath(req, file){
        return req.filePath + '\\' + file.user + '\\' + file.path
    }
}

module.exports = new FileService()
