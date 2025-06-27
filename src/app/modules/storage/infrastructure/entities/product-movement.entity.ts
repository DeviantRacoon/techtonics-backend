import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { UserEntity } from "@app/modules/users/infrastructure/entities/user.entity";
import { ProductEntity } from "./product.entity";

export enum STATUS {
  ACTIVO = "ACTIVO",
  ELIMINADO = "ELIMINADO"
}

export enum MOVEMENT_TYPE {
  ENTRADA = "ENTRADA",
  SALIDA = "SALIDA"
}

@Entity("product_movements")
export class ProductMovementEntity {
  @PrimaryGeneratedColumn()
  productMovementId!: number;

  @ManyToOne(() => ProductEntity, (product) => product.movements, { nullable: false })
  @JoinColumn({ name: "productId" })
  product!: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.movements, { nullable: false })
  @JoinColumn({ name: "userId" }) 
  user!: UserEntity;

  @Column()
  productMovementType!: MOVEMENT_TYPE;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  quantity!: number;

  @Column({ type: "enum", enum: STATUS, default: "ACTIVO" })
  status!: string;

  
  @Column("date", {name: "cutoff_date", nullable: true})
  cutoffDate!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
