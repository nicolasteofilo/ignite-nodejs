import { Request, Response, Router } from 'express';

const categoriesRouter = Router();

const categories = [];

categoriesRouter.post('/categories', (request: Request, response: Response) => {
    const { name, description } = request.body;

    categories.push({
        // id: String(Math.random()),
        name,
        description,
        // created_at: new Date(),
    });

    return response.status(201).json({ messge: 'Category created successfully' });
})

export { categoriesRouter }