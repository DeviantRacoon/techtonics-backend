import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity("permissions")
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  permissionId!: number;

  @Column({ unique: true })
  permissionName!: string;

  @ManyToMany(() => RoleEntity, role => role.permissions)
  roles?: RoleEntity[];
}
