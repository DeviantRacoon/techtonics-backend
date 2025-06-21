import { Expose, Transform, Type, plainToInstance, instanceToPlain } from "class-transformer";
import { format, parseISO } from "date-fns";

import User from "./user";

type STATUS = "ACTIVO" | "ELIMINADO";

export default class Person {
  @Expose() personId?: number;
  @Expose() names?: string;
  @Expose() lastName?: string;
  @Expose() secondLastName?: string;
  @Expose() curp?: string;
  @Expose() gender?: string;
  @Expose() cellphone?: string;
  @Expose() status?: STATUS;
  @Expose() createdAt?: string;
  @Expose() updatedAt?: string;

  @Transform(({ value }) => (value ? format(new Date(value), 'yyyy-MM-dd') : null))
  @Expose()
  birthdate?: string;

  @Type(() => User)
  @Expose()
  users?: User[];

  constructor(data: Partial<Person>) {
    return plainToInstance(Person, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
