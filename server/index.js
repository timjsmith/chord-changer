const path = require('path');
const express = require('express');

async function createServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = require('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: path.resolve(__dirname, '../client')
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, '../client/dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
  return app;
}

if (require.main === module) {
  createServer().then(app => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  });
}

module.exports = createServer;
