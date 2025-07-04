import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { PersonEntity } from "./person.entity";
import { RoleEntity } from "./role.entity";
import { UserSessionEntity } from "./user-session.entity";
import { BusinessUnitEntity } from "./business-unit.entity";
import { ProductEntity } from "@modules/storage/infrastructure/entities/product.entity";
import { ProductMovementEntity } from "@modules/storage/infrastructure/entities/product-movement.entity";
import { CutOffEntity } from "@modules/storage/infrastructure/entities/cut-off.entity";

export enum STATUS {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
  PENDIENTE = "PENDIENTE",
  ELIMINADO = "ELIMINADO"
}

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  email!: string;

  @Column({ length: 64 })
  password!: string;

  @Column({ nullable: true, length: 6 })
  code?: string;

  @Column({ length: 20, unique: true })
  username!: string;

  @Column({ type: "enum", enum: STATUS, default: "PENDIENTE" })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => PersonEntity, person => person.users, {
    cascade: ["insert", "update"],
    eager: true
  })
  person?: PersonEntity;

  @ManyToOne(() => RoleEntity, role => role.users)
  @JoinColumn({ name: "roleId" })
  role?: RoleEntity;

  @OneToMany(() => UserSessionEntity, session => session.user)
  sessions?: UserSessionEntity[];

  @ManyToMany(() => BusinessUnitEntity, businessUnit => businessUnit.users, {
    cascade: true,
    eager: true
  })
  @JoinTable({
    name: "user_business_unit",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "userId"
    },
    inverseJoinColumn: {
      name: "business_unit_id",
      referencedColumnName: "businessUnitId"
    }
  })
  businessUnits?: BusinessUnitEntity[];

  @OneToMany(() => ProductMovementEntity, (movement) => movement.user)
  movements!: ProductMovementEntity[];

  @OneToMany(() => CutOffEntity, (cutOff) => cutOff.user)
  cutOffs!: CutOffEntity[];

  @OneToMany(() => ProductEntity, product => product.createdBy)
  products?: ProductEntity[];

}
