import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import routes from "./routes";
import models from "./models";
import connect, { getDb } from "./connect";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("*", (req, res) =>
  res.status(200).send("Yo! Welcome to trade products")
);

routes(app);
connect();
getDb();

export default app;
