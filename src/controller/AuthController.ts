import { validationResult  } from "express-validator";
import { User } from "../model/User";
import { Request, Response } from "express";
import { UserSchema } from "../entity/User";
import bcrypt from "bcrypt";
import { genToken } from "../Service/JwtService";

const saltRounds = 10;

class AuthController {
  async login(req: Request, res: Response) {
    const data: User = {
      username: req.body.username,
      password: req.body.password,
    };

    const user = await UserSchema.findOne({
      $or: [{ username: data.username }],
    });

    if (user) {
      await bcrypt.compare(data.password, user?.password as string);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      res.json({
        errorCode: 0,
        data: {
          username: user?.username,
          access: await genToken(user?.username, "1h"),
          rf: await genToken(user?.username, "1000h"),
        },
        message: "Authentication success",
      });
    } catch (error) {
      console.error(error);
      res.json({
        errorCode: 0,
        data: { error },
        message: "Authentication fail",
      });
    }
  }

  async register(req: Request, res: Response) {
    const data: User = {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (data.password !== data.confirmPassword) {
      return res.json({
        errorCode: 1,
        data: {},
        message: "Confirm password not matches password",
      });
    }

    const user = await UserSchema.findOne({
      $or: [{ username: data.username }],
    });

    if (user) {
      res.json({
        errorCode: 1,
        data: {},
        message: "User exist",
      });
    }

    try {
      await bcrypt.genSalt(saltRounds, function (error, salt) {
        bcrypt.hash(data.password, salt, function (err, hash) {
          data.password = hash;
          UserSchema.create(data);
        });
      });

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
