import { login, logout, signup } from "../Controllers/authController"

import express from 'express';
const authRouth = express.Router()

authRouth.post('/login',login)
authRouth.post('/signup',signup)
authRouth.post('/logout',logout)

export default authRouth


