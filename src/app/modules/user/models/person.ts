import { BaseModel, AutoAccessor } from "@utils/classes.handler";
import PersonAddress from "./person-address";

type STATUS = "active" | "inactive" | "pending" | "deleted";
export default class Person extends BaseModel {
  @AutoAccessor()
  public personId?: number;

  @AutoAccessor()
  public firstName?: string;

  @AutoAccessor()
  public middleName?: string;

  @AutoAccessor()
  public lastName?: string;

  @AutoAccessor()
  public secondLastName?: string;

  @AutoAccessor()
  public curp?: string;

  @AutoAccessor()
  public cellphone?: string;

  @AutoAccessor()
  public birthdate?: Date;

  @AutoAccessor()
  public status?: STATUS;

  @AutoAccessor()
  public createdAt?: string;

  @AutoAccessor()
  public updatedAt?: string;

  @AutoAccessor()
  public users?: any;

  @AutoAccessor()
  public address?: PersonAddress[];

  constructor(init?: Partial<Person>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }
}
