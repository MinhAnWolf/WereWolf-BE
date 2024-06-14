import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiConstant } from "../../constant/ApiConstant";

function HtppFilter(req: Request, res: Response, next: NextFunction) {
  if (
    req.url.includes(ApiConstant.API_LOGIN) ||
    req.url.includes(ApiConstant.API_REGISTER)
  ) {
    console.log("filter");
    next();
    return;
  }

  // check header access and rf
  //   let access = req.headers.get("access");
  //   let rf = req.headers.get("rf");
  //   if (access !== null && rf !== null) {
  //   }
}

function genJwt() {}

function validatorJwt() {}

function deJwt() {}

export default HtppFilter;
