const { getProductsCollection } = require("../db/products");
const { ObjectId } = require("mongodb");

async function listProductsHandler(req, res) {
  try {
    const { category, minPrice, sort, fields } = req.query;

    const filter = {};

    if (typeof category === "string" && category.trim() !== "") {
      filter.category = category.trim();
    }

    if (minPrice !== undefined) {
      const min = Number(minPrice);
      if (Number.isNaN(min)) {
        return res.status(400).json({ error: "minPrice must be a number" });
      }
      filter.price = { $gte: min };
    }

    let sortSpec;
    if (sort !== undefined) {
      if (sort === "price") sortSpec = { price: 1 };
      else return res.status(400).json({ error: "sort only supports: price" });
    }

    let projection;
    if (typeof fields === "string" && fields.trim() !== "") {
      const parts = fields
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      if (parts.length === 0) {
        return res
          .status(400)
          .json({ error: "fields must contain at least one field name" });
      }
      projection = {};
      for (const f of parts) {
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(f)) {
          return res
            .status(400)
            .json({ error: `Invalid field name in fields: ${f}` });
        }
        projection[f] = 1;
      }
    }

    const productsCollection = getProductsCollection();
    let cursor = productsCollection.find(filter);
    if (projection) cursor = cursor.project(projection);
    if (sortSpec) cursor = cursor.sort(sortSpec);

    const products = await cursor.toArray();
    res.status(200).json({ count: products.length, products });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductByIdHandler(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const productsCollection = getProductsCollection();
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createProductHandler(req, res) {
  try {
    const { name, price, category } = req.body;

    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof category !== "string" ||
      category.trim() === "" ||
      typeof price !== "number" ||
      Number.isNaN(price)
    ) {
      return res.status(400).json({
        error:
          "Missing or invalid fields. Required: name (string), price (number), category (string)",
      });
    }

    const newProduct = {
      name: name.trim(),
      price,
      category: category.trim(),
    };

    const productsCollection = getProductsCollection();
    const result = await productsCollection.insertOne(newProduct);

    res.status(201).json({
      _id: result.insertedId,
      ...newProduct,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function patchProductHandler(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const update = {};
    const { name, price, category } = req.body;

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "") {
        return res
          .status(400)
          .json({ error: "name must be a non-empty string" });
      }
      update.name = name.trim();
    }

    if (category !== undefined) {
      if (typeof category !== "string" || category.trim() === "") {
        return res
          .status(400)
          .json({ error: "category must be a non-empty string" });
      }
      update.category = category.trim();
    }

    if (price !== undefined) {
      if (typeof price !== "number" || Number.isNaN(price)) {
        return res.status(400).json({ error: "price must be a number" });
      }
      update.price = price;
    }

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ error: "Provide at least one field to update" });
    }

    const productsCollection = getProductsCollection();

    const updateResult = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update },
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await productsCollection.findOne({
      _id: new ObjectId(id),
    });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProductHandler(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const { name, price, category } = req.body;

    if (name === undefined || price === undefined || category === undefined) {
      return res.status(400).json({
        error: "All fields (name, price, category) must be provided",
      });
    }

    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof category !== "string" ||
      category.trim() === "" ||
      typeof price !== "number" ||
      Number.isNaN(price)
    ) {
      return res.status(400).json({
        error: "name, category must be non-empty strings and price must be a number",
      });
    }

    const productsCollection = getProductsCollection();

    const result = await productsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name.trim(),
          category: category.trim(),
          price: price,
        },
      },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(result.value);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}


async function deleteProductHandler(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const productsCollection = getProductsCollection();
    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  listProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  patchProductHandler,
  deleteProductHandler,
  updateProductHandler,
};
