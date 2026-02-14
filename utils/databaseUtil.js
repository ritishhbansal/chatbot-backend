const { MongoClient } = require("mongodb");

require("dotenv").config(); // ensure env is loaded

const Mongo_Url = process.env.MONGO_URL;

let _db;

const mongoConnect = async (callback) => {
  try {
    if (!Mongo_Url) {
      throw new Error("MONGO_URL is not defined in .env");
    }

    const client = await MongoClient.connect(Mongo_Url);
    _db = client.db("Chatbot");

    console.log("✅ MongoDB connected");
    callback();

  } catch (err) {
    console.log("❌ Error while connecting to mongo:", err.message);
  }
};

const getdb = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
