import { Router, Request, Response } from "express"

import { User } from "../../db/models/user"

const router = Router()

router.post("/", (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = new User({
    name: username,
    password,
    email,
  });

  user.save().then(() => {
    res.redirect("/");
  });
})

export default router