function home(req, res) {
  res.status(200).type("html").send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Shop API</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 32px; line-height: 1.5; }
    .card { max-width: 720px; border: 1px solid #ddd; border-radius: 12px; padding: 20px; }
    h1 { margin: 0 0 12px; }
    code { background: #f6f8fa; padding: 2px 6px; border-radius: 6px; }
    ul { margin: 12px 0 0; padding-left: 18px; }
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
    .muted { color: #666; font-size: 14px; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Shop API</h1>
    <p>Endpoints:</p>
    <ul>
      <li><code>GET</code> <a href="/api/products">/api/products</a></li>
      <li><code>GET</code> <code>/api/products/:id</code> <span class="muted"></span></li>
      <li><code>POST</code> <code>/api/products</code></li>
      <li><code>PUT</code> <code>/api/products/:id</code></li>
      <li><code>DELETE</code> <code>/api/products/:id</code></li>
    </ul>

    <p class="muted">
      Tip: try <a href="/api/products?sort=price&fields=name,price">/api/products?sort=price&fields=name,price</a>
    </p>
  </div>
</body>
</html>`);
}

module.exports = { home };
