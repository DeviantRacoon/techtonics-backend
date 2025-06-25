import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { UserEntity } from "./user.entity";
import { ProductEntity } from "@modules/storage/infrastructure/entities/product.entity";

export enum STATUS {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
  ELIMINADO = "ELIMINADO"
}

@Entity("business_units")
export class BusinessUnitEntity {
  @PrimaryGeneratedColumn()
  businessUnitId!: number;

  @Column()
  businessUnitEmail!: string;

  @Column( { length: 512 })
  businessUnitLogo!: string;

  @Column({ length: 32 })
  businessUnitName!: string;

  @Column({ type: "enum", enum: STATUS, default: "ACTIVO" })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => UserEntity, user => user.businessUnits)
  users?: UserEntity[];

  @OneToMany(() => ProductEntity, product => product.businessUnit)
  products?: ProductEntity[];
}
