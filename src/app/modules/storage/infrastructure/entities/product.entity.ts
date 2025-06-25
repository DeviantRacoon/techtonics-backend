import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '@modules/users/infrastructure/entities/user.entity';
import { BusinessUnitEntity } from '@modules/users/infrastructure/entities/business-unit.entity';

export enum TYPE {
  ALMACEN = 'ALMACEN',
  SERVICIO = 'SERVICIO'
}

export enum STATUS {
  ACTIVO = 'ACTIVO',
  ELIMINADO = 'ELIMINADO',
  AGOTADO = 'AGOTADO'
}

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productId!: number;

  @Column({ length: 128 })
  productName!: string;

  @Column({ length: 512 })
  productImage!: string;

  @Column({ type: 'enum', enum: TYPE })
  type!: string;

  @Column('int')
  stock!: number;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVO })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => UserEntity, user => user.products, { eager: true })
  createdBy!: UserEntity;

  @ManyToOne(() => BusinessUnitEntity, bu => bu.products, { eager: true })
  businessUnit!: BusinessUnitEntity;
}
