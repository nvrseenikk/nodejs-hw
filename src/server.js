import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(logger);
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(helmet());
app.use(cookieParser());

app.use(notesRoutes);
app.use(authRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => {
  console.log(` 🚀 Server is running on localhost:${port}`);
});
