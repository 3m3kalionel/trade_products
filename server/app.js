import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import routes from "./routes";
import models from "./models";
import connect, { getDb } from "./connect";

dotenv.config();

export const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const publicPath = path.join(__dirname, "../build", "index.html");
// console.log("*******", publicPath);

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.get("/*", function (req, res) {
//   res.sendFile(publicPath);
// });

app.get("/", (req, res) =>
  res.status(200).send("Yo! Welcome to trade products")
);

routes(app);
connect();
getDb();

export default app;
