import { Request, Response } from 'express';

import { ListCategoryUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const all = this.listCategoryUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ListCategoriesController };
