import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category) // very cars to one category
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars', // noem da tabela de relacionamentos
    joinColumns: [{ name: 'car_id' }], // coluna da tabela car, é o nome da coluna dentro da tabela de relacionamentos que referencia essa table a que estamos
    inverseJoinColumns: [{ name: 'specification_id' }], // coluna da tabela specification, é a outra coluna da tabela de relacionamentos
  })
  specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}

export { Car };
