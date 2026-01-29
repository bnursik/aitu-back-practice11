require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!PORT) {
  console.error("PORT is not defined in .env");
  process.exit(1);
}

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

module.exports = {
  PORT,
  MONGO_URI,
};
