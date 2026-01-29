const express = require("express");

const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const rootRoutes = require("./routes/root.routes");
const productsRoutes = require("./routes/products.routes");
const metaRoutes = require("./routes/meta.routes");

const app = express();

app.use(logger);
app.use(express.json());

app.use("/", rootRoutes);
app.use("/api/products", productsRoutes);
app.use("/api", metaRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
