function authorize(req, res, next) {
  try {
    const token = req.headers.authorization;
    const VALID_TOKEN = "password";

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (token !== VALID_TOKEN) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { authorize };
