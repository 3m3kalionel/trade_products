import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const getbaseUrl = env => {
  let appUrl;
  switch (env) {
    case "production":
      appUrl = "https://trade-market-test.herokuapp.com/api/v1";
      break;
    default:
      appUrl = "http://localhost:8080/api/v1";
  }
  return process.env[appUrl];
};

export default axios.create({
  baseURL: getbaseUrl(process.env.NODE_ENV),
  headers: { "content-type": "application/json" },
});

console.log(getbaseUrl(process.env.NODE_ENV), "&&&&", process.env.NODE_ENV);
