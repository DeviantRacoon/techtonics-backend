import { BaseModel, AutoAccessor } from "@utils/classes.handler";
import Person from "./person";

type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";
export default class PersonAddress extends BaseModel {
  @AutoAccessor()
  public addressId?: number;

  @AutoAccessor()
  public personId?: number;

  @AutoAccessor()
  public street?: string;

  @AutoAccessor()
  public number?: string;

  @AutoAccessor()
  public suburb?: string;

  @AutoAccessor()
  public city?: string;

  @AutoAccessor()
  public state?: string;

  @AutoAccessor()
  public country?: string;

  @AutoAccessor()
  public zipCode?: string;

  @AutoAccessor()
  public status?: string;

  @AutoAccessor()
  public createdAt?: Date;

  @AutoAccessor()
  public updatedAt?: Date;

  @AutoAccessor()
  public person?: Person;

  constructor(init?: Partial<PersonAddress>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}