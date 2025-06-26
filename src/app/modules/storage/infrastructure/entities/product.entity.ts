import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

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

  @Column({ length: 64 })
  productName!: string;

  @Column({ length: 128 })
  productDescription!: string;

  @Column({ length: 512, nullable: true })
  productImage!: string;

  @Column({ length: 16, nullable: true })
  productCode?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  productPrice!: number;

  @Column({ type: 'enum', enum: TYPE })
  type!: string;

  @Column('int', { default: 0 })
  stock!: number;

  @ManyToOne(() => UserEntity, user => user.products)
  createdBy!: UserEntity;

  @Column({ nullable: true })
  businessUnitId?: number

  @ManyToOne(() => BusinessUnitEntity, bu => bu.products)
  @JoinColumn({ name: "businessUnitId" })
  businessUnit!: BusinessUnitEntity

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVO })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
