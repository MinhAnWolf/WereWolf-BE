import AuthController from "../controller/AuthController";
import { Request, Response } from "express";
import { ApiConstant } from "../constant/ApiConstant";

const express = require("express");
const router = express.Router();
const authController = new AuthController();

router.post(ApiConstant.API_LOGIN, authController.login);
router.post(ApiConstant.API_REGISTER, authController.register);

export default router;
