import { BaseModel, AutoAccessor } from "@utils/classes.handler";
import Permission from "./permission";

type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";
export default class Section extends BaseModel {
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
  public permission?: Permission[];

  constructor(init?: Partial<Section>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
