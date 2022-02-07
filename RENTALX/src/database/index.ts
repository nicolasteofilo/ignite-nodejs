import { createConnection, getConnectionOptions } from 'typeorm';

import { Category } from '../modules/cars/entities/Category';

interface IOption {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOption;
  newOptions.host = 'database_rentalx';
  createConnection({
    ...options,
    entities: [Category],
  });
});
