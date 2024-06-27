import { Request, Response } from "express";
import { RoleSchema } from "../entity/Role";

class RoleController {
  async createAndUpdate(req: Request, res: Response) {
    await RoleSchema.create(req.body);
    res.status(200);
    res.json({
      message: "success",
    });
  }

  delete(req: Request, res: Response) {}
}

export default RoleController;
