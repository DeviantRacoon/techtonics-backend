import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { UserEntity } from "./user.entity";
import { PermissionEntity } from "./permission.entity";

export enum STATUS {
  ACTIVO = "ACTIVO",
  ELIMINADO = "ELIMINADO"
}

@Entity("roles")
export class RoleEntity {
  @PrimaryGeneratedColumn()
  roleId!: number;

  @Column()
  roleName!: string;

  @Column({ type: "enum", enum: STATUS, default: "ACTIVO" })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserEntity, user => user.role)
  users?: UserEntity[];

  @ManyToMany(() => PermissionEntity, permission => permission.roles, { cascade: true })
  @JoinTable({
    name: "role_permission",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "roleId"
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "permissionId"
    }
  })
  permissions?: PermissionEntity[];
}
