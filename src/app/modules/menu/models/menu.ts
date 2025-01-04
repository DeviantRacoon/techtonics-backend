import { BaseModel, AutoAccessor } from "@utils/classes.handler";

type STATUS = "active" | "inactive" | "pending" | "deleted";
export default class Menu extends BaseModel {
  @AutoAccessor()
  public menuId?: number;

  @AutoAccessor()
  public menuName?: string;

  @AutoAccessor()
  public status?: STATUS;

  @AutoAccessor()
  public createdAt?: string;

  @AutoAccessor()
  public updatedAt?: string;

  @AutoAccessor()
  public section?: any;

  constructor(init?: Partial<Menu>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
