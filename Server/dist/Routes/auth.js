"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("@/Controllers/authController");
const express = require("express");
const router = express.Router();
router.post('/login', authController_1.login);
router.post('/signup', authController_1.signup);
router.post('/logout', authController_1.logout);
exports.default = router;
