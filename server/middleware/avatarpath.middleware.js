function avatarPath(path) {
    return function(req, res, next){
        req.avatarPath = path
        next()
    }
}

module.exports = avatarPath