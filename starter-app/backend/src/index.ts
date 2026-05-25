import { app } from './server.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Task API server running on http://localhost:${PORT}`);
});
