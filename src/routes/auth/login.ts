import { Router, Request, Response } from "express"
import jwt from "jsonwebtoken"

import { User } from "../../db/models/user"

const MY_SECRET = process.env.MY_SECRET as string

const router = Router()

router.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({
      name: username,
    });

    if (!user) {
      return res.status(403).json({
        error: "invalid login",
      });
    }

    if (user.password !== password) {
      return res.status(403).json({
        error: "invalid login",
      });
    }

    user.password = undefined

    const token = jwt.sign(user.toJSON(), MY_SECRET, { expiresIn: "10min" });

    res.cookie("token", token);

    return res.redirect("/news");
  });

export default router