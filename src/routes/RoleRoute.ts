import { ApiConstant } from "../constant/ApiConstant";
import RoleController from "../controller/RoleController";

const express = require("express");
const router = express.Router();

router.post(ApiConstant.API_CU_ROLE, new RoleController().createAndUpdate);
export default router;
