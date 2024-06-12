import AuthService from "../Service/AuthService";
import AuthController from "../controller/AuthController";

const express = require('express')
const router = express.Router();
const authService = new AuthService();
const authController = new AuthController();

router.get(authService.login(), authController.login())
router.get(authService.register(), authController.register())