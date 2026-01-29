const { getDB } = require("../db/client");
const { COLLECTION_NAME } = require("../config/constants");

function getProductsCollection() {
  const db = getDB();
  return db.collection(COLLECTION_NAME);
}

module.exports = {
  getProductsCollection,
};
