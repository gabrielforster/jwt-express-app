import { Router } from "express"
import jwt from "jsonwebtoken"

import { User } from "../../db/models/user"

const router = Router()

router.post("/login", async (req, res) => {
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

    const token = jwt.sign(user, process.env.MY_SECRET as string, { expiresIn: "10min" });

    res.cookie("token", token);

    return res.redirect("/news");
  });

export default router