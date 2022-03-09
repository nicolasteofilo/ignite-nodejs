import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar ) 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX', 'https://avatars.githubusercontent.com/u/81480818?v=4')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const { statusCode } = await request(app)
      .post('/categories')
      .send({
        name: 'New Category',
        description: 'New Category Description',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(statusCode).toBe(201);
  });
  it('should be not able to create a new category if category already exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const { statusCode } = await request(app)
      .post('/categories')
      .send({
        name: 'New Category',
        description: 'New Category Description',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(statusCode).toBe(400);
  });
});
