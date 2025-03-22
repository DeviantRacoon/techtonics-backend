import { BaseModel, AutoAccessor } from "@utils/classes.handler";
import Section from "./section";

type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";
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
  public section?: Section[];

  constructor(init?: Partial<Menu>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
