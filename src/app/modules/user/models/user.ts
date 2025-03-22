import { BaseModel, AutoAccessor } from "@utils/classes.handler";

import Role from "./role";
import Person from "./person";

type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";
export default class User extends BaseModel {
  @AutoAccessor()
  public userId?: number;

  @AutoAccessor()
  public personId?: number;

  @AutoAccessor()
  public roleId?: number;

  @AutoAccessor()
  public username?: string;

  @AutoAccessor()
  public email?: string;

  @AutoAccessor()
  public password?: string;

  @AutoAccessor()
  public code?: string;

  @AutoAccessor()
  public status?: STATUS;

  @AutoAccessor()
  public createdAt?: string;

  @AutoAccessor()
  public updatedAt?: string;

  @AutoAccessor()
  public person?: Person;

  @AutoAccessor()
  public role?: Role;

  constructor(init?: Partial<User>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
