import { Expose, Transform, Type, plainToInstance, instanceToPlain } from "class-transformer";

import PersonAddress from "./person-address";
import User from "./user";

type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";
export default class Person {
  @Expose() public personId?: number;
  @Expose() public names?: string;
  @Expose() public lastName?: string;
  @Expose() public secondLastName?: string;
  @Expose() public curp?: string;
  @Expose() public gender?: string;
  @Expose() public cellphone?: string;
  @Expose() public status?: STATUS;
  @Expose() public createdAt?: string;
  @Expose() public updatedAt?: string;

  @Transform(({ value }) => (value ? new Date(value).toISOString() : null))
  @Expose() public birthdate?: string;

  @Type(() => PersonAddress)
  @Expose()
  public address?: PersonAddress[];

  @Type(() => User)
  @Expose()
  public users?: User[];

  constructor(data: Partial<Person>) {
    return plainToInstance(Person, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return instanceToPlain(this, { strategy: "excludeAll" });
  }
}
