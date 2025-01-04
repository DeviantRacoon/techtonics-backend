import { BaseModel, AutoAccessor } from "@utils/classes.handler";

import User from "./user";
import Permission from "@modules/menu/models/permission";

type STATUS = "active" | "inactive" | "pending" | "deleted";
export default class Role extends BaseModel {
  @AutoAccessor()
  public roleId?: number;

  @AutoAccessor()
  public roleName?: string;

  @AutoAccessor()
  public status?: STATUS;

  @AutoAccessor()
  public createdAt?: string;

  @AutoAccessor()
  public updatedAt?: string;

  @AutoAccessor()
  public users?: User;

  @AutoAccessor()
  public permission?: Permission[];

  constructor(init?: Partial<Role>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
