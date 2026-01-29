const express = require("express");
const authorize = require("../middleware/authMiddleware");

const {
  listProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  patchProductHandler,
} = require("../handlers/products.handler");

const router = express.Router();

router.get("/", listProductsHandler);
router.get("/:id", getProductByIdHandler);

//protected routes
router.use(authorize.authorize);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.patch("/:id", patchProductHandler);
router.delete("/:id", deleteProductHandler);

module.exports = router;
