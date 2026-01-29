const express = require("express");

const {
  listProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../handlers/products.handler");

const router = express.Router();

router.get("/", listProductsHandler);
router.get("/:id", getProductByIdHandler);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.patch("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

module.exports = router;
