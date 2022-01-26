import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../model/Category';

const categoriesRouter = Router();

const categories: Category[] = [];

categoriesRouter.post("/", (request: Request, response: Response) => {
    const { name, description } = request.body;

    const category = new Category();

    // atribuindo itens para dentro do meu objeto category
    Object.assign(category, {
        name,
        description,
        created_at: new Date()
    })

    categories.push(category);

    return response.status(201).json({ messge: 'Category created successfully', category });
})

export { categoriesRouter }