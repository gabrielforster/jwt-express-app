import express, { urlencoded, json, Response, NextFunction } from "express"
import cookieParser from "cookie-parser"
import path from "path"

import auth from "./routes/auth"
import { validateCookieJWTAuth } from "./middleware/validateCookieJTWAtuh"
import { RequestWithUser } from "./types/Request"

const PORT = process.env.PORT || 3000

const app = express()

app.use(json())
app.use(
  urlencoded({
      extended: true
  })
)
app.use(cookieParser())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
})

app.get(
  "/news",
  validateCookieJWTAuth,
  (req, res) => {
    res.sendFile(path.join(__dirname, "../public/news.html"));
  }
);

app.use("/auth", auth)

app.listen(PORT, () => {
  console.log("Server started on port 3000")
})