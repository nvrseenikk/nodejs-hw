import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import pino from 'pino-http';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(helmet());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({ message: ' 🌍 Hello World!' });
});

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(` 🚀 Server is running on localhost:${port}`);
});
