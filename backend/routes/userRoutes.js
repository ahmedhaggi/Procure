const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const { sendEmail } = require("../config/email")



router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(200).send({ message: "User already exist", success: false })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        req.body.password = hashedPassword

        const newUser = new User(req.body)

        await newUser.save()
        res.status(201).send({ message: "User register sucessfully", success: true })

    } catch (error) {
        res.status(500).send({ message: "Error user registering", success: false })
    }
})

function generateCode() {
    return Math.floor(Math.random() * 900000) + 100000;
}
router.post("/forgot", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(200).send({ message: "User does not exit", success: false })
        }

        const resetCode = generateCode()

        await sendEmail(user.email, "Reset Password", `Reset password, your reset code is ${resetCode}`)

        await user.updateOne({ $set: { resetCode } })

        res.status(200).send({ message: "Reset email has been set successful", success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error Login ", success: false, error })
    }
})

router.post("/reset", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, resetCode: req.body.code })

        console.log(user)

        if (!user) {
            return res.status(400).send({ message: "Invalid code, or user not exist", success: false })
        }


        const password = req.body.password
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)


        await user.updateOne({ $set: { resetCode: undefined, password: hashedPassword } })

        res.status(200).send({ message: "Password changed successfully", success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error Login ", success: false, error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(200).send({ message: "User does not exit", success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: "Password is Incorrect", success: false })

        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
            res.status(200).send({ message: "Login successful", success: true, data: token })
        }

    } catch (error) {
        res.status(500).send({ message: "Error Login ", success: false, error })
    }
})

router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        user.password = undefined
        if (!user) {
            return res.status(200).send({
                message: "User Does not exist",
                success: false
            })
        } else {
            res.status(200).send({

                success: true,
                data: user
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Error getting user Info",
            success: false,
            error
        })
    }
})


module.exports = router