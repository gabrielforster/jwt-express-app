import { Router } from "express"

import login from "./login"
import register from "./register"

const router = Router()

router.use("/login", login)
router.use("/register", register)

export default router