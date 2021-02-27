import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const getbaseUrl = env => {
  let appUrl;
  switch (env) {
    case "production":
      appUrl = "REACT_APP_SERVER_PROD_URL";
      break;
    default:
      appUrl = "REACT_APP_SERVER_DEV_URL";
  }
  return process.env[appUrl];
};

export default axios.create({
  baseURL: getbaseUrl(process.env.NODE_ENV),
  headers: { "Content-Type": "application/json" },
});

console.log("&&&&", process.env.NODE_ENV);
