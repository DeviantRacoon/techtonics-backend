import { BaseModel, AutoAccessor } from "@utils/classes.handler";

import Role from "@modules/user/models/role";
import Section from "./section";

type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";
export default class Permission extends BaseModel {
  @AutoAccessor()
  public permissionId?: number;

  @AutoAccessor()
  public roleId?: number;

  @AutoAccessor()
  public sectionId?: number;

  @AutoAccessor()
  public status?: STATUS;

  @AutoAccessor()
  public createdAt?: string;

  @AutoAccessor()
  public updatedAt?: string;

  @AutoAccessor()
  public role?: Role;

  @AutoAccessor()
  public section?: Section;

  constructor(init?: Partial<Permission>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
