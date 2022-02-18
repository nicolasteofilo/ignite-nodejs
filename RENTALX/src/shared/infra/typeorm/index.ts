import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_rentalx'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
