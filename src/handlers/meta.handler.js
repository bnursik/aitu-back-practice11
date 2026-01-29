function versionHandler(req, res) {
  res.status(200).json({
    version: "1.1",
    updatedAt: new Date().toISOString(),
  });
}

function healthHandler(req, res) {
  res.status(200).json({
    status: "ok",
  });
}

module.exports = { versionHandler, healthHandler };
