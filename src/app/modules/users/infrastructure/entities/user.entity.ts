import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { PersonEntity } from "./person.entity";
import { RoleEntity } from "./role.entity";
import { UserSessionEntity } from "./user-session.entity";

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
}
