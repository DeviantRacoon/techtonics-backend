import { BaseModel, AutoAccessor } from "@utils/classes.handler";

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
  public users?: any;

  constructor(init?: Partial<Role>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
