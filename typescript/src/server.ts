import express, { Request, Response } from 'express';
import { createCourse } from './routes';

const app = express();

app.get('/', createCourse)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})