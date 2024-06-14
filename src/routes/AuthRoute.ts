import AuthController from "../controller/AuthController";
import { Request, Response } from "express";
import { ApiConstant } from "../constant/ApiConstant";
import { checkSchema, validationResult  } from "express-validator";

const express = require("express");
const router = express.Router();
const authController = new AuthController();
import { Regex } from "../regex/Regex";

const validatorLogin = checkSchema({
    username: {
      notEmpty: {
        errorMessage: "Username not empty",
      },
      matches: {
        options: Regex.username,
        errorMessage: "Username is wrong format",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Password not empty",
      },
      matches: {
        options: Regex.username,
        errorMessage: "password is wrong format",
      },
    },
  });

router.post(ApiConstant.API_LOGIN, validatorLogin, authController.login);

const validatorRegister = checkSchema({
    username: {
      notEmpty: {
        errorMessage: "Username not empty",
      },
      matches: {
        options: Regex.username,
        errorMessage: "Username is wrong format",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Password not empty",
      },
      matches: {
        options: Regex.username,
        errorMessage: "password is wrong format",
      },
    },

    confirmPassword: {
      notEmpty: {
        errorMessage: "Confirm password not empty",
      },
    },
  });
router.post(ApiConstant.API_REGISTER, validatorRegister, authController.register);

export default router;
