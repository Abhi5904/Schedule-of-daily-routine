const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = 'Abhiisgoodb@oy'

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Lenght should be 4 to 8').isLength({ min: 4, max: 8 })
], async (req, res) => {
    const errors = validationResult(req)
    let success=false
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry email is already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const jwtData = jwt.sign(data, JWT_SECRET)
        // console.log(jwtData)
        success=true
        res.json({ success,jwtData })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'can not be blank password').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            let success=false
            return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const jwtData = jwt.sign(payload, JWT_SECRET)
        success=true
        res.json({success, jwtData })

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})
module.exports = router