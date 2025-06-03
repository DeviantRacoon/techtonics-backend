import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

export enum STATUS {
  ACTIVO = "ACTIVO",
  ELIMINADO = "ELIMINADO"
}

@Entity("persons")
export class PersonEntity {
  @PrimaryGeneratedColumn()
  personId!: number;

  @Column({ nullable: true })
  names?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  secondLastName?: string;

  @Column({ nullable: true })
  curp?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  cellphone?: string;

  @Column({ type: "date", nullable: true })
  birthdate?: Date;

  @Column({ type: "enum", enum: STATUS, default: "ACTIVO" })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserEntity, user => user.person)
  users?: UserEntity[];
}
