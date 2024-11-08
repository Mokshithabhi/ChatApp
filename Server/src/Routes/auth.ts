import { login, logout, signup } from "../Controllers/authController"

const express = require("express")
const router = express.Router()

router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)

export default router