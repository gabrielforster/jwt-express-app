import express, { urlencoded, json, Response, NextFunction } from "express"
import cookieParser from "cookie-parser"
import path from "path"
import mongoose from "mongoose"
import { config } from "dotenv"
config()

import auth from "./routes/auth"
import { validateCookieJWTAuth } from "./middleware/validateCookieJTWAtuh"
import { RequestWithUser } from "./types/Request"

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL;

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

mongoose.connect(MONGO_URL as string).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});