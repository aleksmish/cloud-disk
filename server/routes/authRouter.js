const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require("jsonwebtoken")
const config = require("config")
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 4 and shorter than 12 characters').isLength({min:5, max:12})
    ], 
    async(req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({message: 'Incorrect request', errors})
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if(candidate){
            return res.status(400).json({message: 'User with this email already exists'})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({email, password: hashPassword})

        await user.save()
        await fileService.createDir(req, new File({user: user._id, name: ''}))

        return res.json({message: "User has been created"})
    }
    catch(e){
        res.send({message: String(e)})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message: "User is not found"})
        }
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({message: "Invalid password"})
        }
        
        const token = jwt.sign({id: user.id}, config.get("privateKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (e) {
        res.send({message: "Error"})
    }
})

router.get('/auth', authMiddleware, async(req, res) => {
    try{
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get("privateKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    }
    catch(e){
        res.send({message: 'No access'})
    }
})

module.exports = router