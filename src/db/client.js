const { MongoClient } = require("mongodb");
const { MONGO_URI } = require("../config/env");
const { DB_NAME } = require("../config/constants");

const client = new MongoClient(MONGO_URI);
let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(DB_NAME);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected. Call connect first.");
  }
  return db;
}

module.exports = {
  connectDB,
  getDB,
};
