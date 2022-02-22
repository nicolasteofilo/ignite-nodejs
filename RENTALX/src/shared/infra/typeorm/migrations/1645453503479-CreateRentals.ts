import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1645453503479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'start_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
          },
          {
            name: 'total',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCarRental',
            referencedTableName: 'cars', // tabela de origem
            referencedColumnNames: ['id'], // coluna de origem
            columnNames: ['car_id'], // coluna de destino (referenciada)
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKUserRental',
            referencedTableName: 'users', // tabela de origem
            referencedColumnNames: ['id'], // coluna de origem
            columnNames: ['user_id'], // coluna de destino (referenciada)
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}
