import { Request, Response, Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.post("/", (request: Request, response: Response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByIdName(name);

    if (categoryAlreadyExists) {
        return response.status(400).json({ error: "Category already exists" });
    }

    const category = categoriesRepository.create({ name, description });
    return response.status(201).json({ messge: 'Category created successfully', category});
})

categoriesRouter.get("/", (request: Request, response: Response) => {
    const all = categoriesRepository.findAll();

    if(all.length === 0) {
        return response.status(204).json({ message: 'No categories found'});
    }

    return response.status(200).json(all);
})

export { categoriesRouter }