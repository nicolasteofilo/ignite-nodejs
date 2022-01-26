import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const categoriesRouter = Router();

const categories = [];

categoriesRouter.post("/", (request: Request, response: Response) => {
    const { name, description } = request.body;

    const category = {
        id: uuidv4(),
        name,
        description,
    }

    categories.push(category);

    return response.status(201).json({ messge: 'Category created successfully' });
})

export { categoriesRouter }