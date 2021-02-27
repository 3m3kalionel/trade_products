import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import routes from "./routes";
import models from "./models";
import connect, { getDb } from "./connect";

dotenv.config();

export const port = process.env.PORT || 7000;

const ALLOWED_ORIGINS = [
  "https://trade-market-test.herokuapp.com",
  "http://localhost:3000",
];

const app = express();

connect();
getDb();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const publicPath = path.join(__dirname, "../build", "index.html");

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) =>
  res.status(200).send("Yo! Welcome to trade products")
);

routes(app);

app.get("/*", function (req, res) {
  res.sendFile(publicPath);
});

export default app;
