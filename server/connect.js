import mongoose from "mongoose";

let db;

mongoose.Promise = global.Promise;

const connect = async () => {
    const database = await mongoose.connect(process.env.APP_URL_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    mongoose.connection.on("connected", () => {
        console.log("Connected to a mongo instance");
    });

    mongoose.connection.on("error", err => {
        console.error("Error connecting to mongo", err);
    });

    db = database;
    return "connected";
};

export const getDb = () => {
    return db;
};

export default connect;
