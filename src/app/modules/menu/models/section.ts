import { BaseModel, AutoAccessor } from "@utils/classes.handler";

type STATUS = "active" | "inactive" | "pending" | "deleted";
export default class Menu extends BaseModel {
  @AutoAccessor()
  public sectionId?: number;

  @AutoAccessor()
  public menuId?: number;

  @AutoAccessor()
  public sectionName?: string;

  @AutoAccessor()
  public url?: string;

  @AutoAccessor()
  public status?: STATUS;

  @AutoAccessor()
  public createdAt?: string;

  @AutoAccessor()
  public updatedAt?: string;

  @AutoAccessor()
  public menu?: any;

  @AutoAccessor()
  public permission?: any;

  constructor(init?: Partial<Menu>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
