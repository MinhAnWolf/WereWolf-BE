import { checkSchema } from "express-validator";
import { User } from "../model/User";
import { Request, Response } from "express";
import { UserSchema } from "../entity/User";
import { BaseResponse } from "../model/BaseResponse";
class AuthController {
  login() {}

  async register(req: Request, res: Response) {
    const data: User = {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const errorValid = await checkSchema({
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
        matches: {
          options: data.password,
          errorMessage: "Confirm password not matches password",
        },
      },
    }).run(req);

    if (errorValid.length > 0) {
      res.status(400);
      return errorValid;
    }

    try {
      await UserSchema.create(data);
      res.status(200);
      return res.json({
        errorCode: 0,
        data: {},
        message: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
