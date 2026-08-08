import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World! Hidden Leaf Quest API is running.');
});

app.listen(PORT, () => {
  console.log(`[server]: Сервер запущен на http://localhost:${PORT}`);
});
