const { getDb } = require("../db");
const { COLLECTION_NAME } = require("../config/constants");

function getProductsCollection() {
  const db = getDb();
  return db.collection(COLLECTION_NAME);
}

module.exports = {
  getProductsCollection,
};
