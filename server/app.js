import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connect, { getDb } from "./connect";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("*", (req, res) => res.status(200).send("Yo! Welcome to trade products"));

connect();
getDb();

export default app;
