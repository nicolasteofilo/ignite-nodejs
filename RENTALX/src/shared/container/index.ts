import { container } from 'tsyringe';

import { ICaterogiesRepository } from '../../modules/cars/repositories/ICaterogiesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

container.registerSingleton<ICaterogiesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);
