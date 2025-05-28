import { Expose, Type, plainToInstance, instanceToPlain } from "class-transformer";
import Person from "./person";

type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";

export default class PersonAddress {
  @Expose() addressId?: number;
  @Expose() personId?: number;
  @Expose() street?: string;
  @Expose() number?: string;
  @Expose() suburb?: string;
  @Expose() city?: string;
  @Expose() state?: string;
  @Expose() country?: string;
  @Expose() zipCode?: string;
  @Expose() status?: STATUS;

  @Type(() => Date)
  @Expose()
  createdAt?: Date;

  @Type(() => Date)
  @Expose()
  updatedAt?: Date;

  @Type(() => Person)
  @Expose()
  person?: Person;

  constructor(data: Partial<PersonAddress>) {
    return plainToInstance(PersonAddress, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
