import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';

createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log('🏃 Server is running on port 3333');
});
