function notFound(req, res) {
  res.status(404).json({ error: "API endpoint not found" });
}

module.exports = notFound;
