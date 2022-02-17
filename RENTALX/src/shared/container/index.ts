import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICaterogiesRepository } from '@modules/cars/repositories/ICaterogiesRepository';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICaterogiesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
