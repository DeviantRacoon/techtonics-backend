import { Expose, Type, plainToInstance, instanceToPlain, Transform } from "class-transformer";

import User from "./user";

type STATUS = "ACTIVO" | "INACTIVO" | "ELIMINADO";

export default class BusinessUnit {
  @Expose() businessUnitId?: number;
  @Expose() businessUnitEmail?: string;
  @Expose() businessUnitLogo?: string;
  @Expose() businessUnitName?: string;

  @Expose() status?: STATUS;
  @Expose() createdAt?: string;

  @Type(() => User)
  @Expose()
  users?: User[];

  constructor(data: Partial<BusinessUnit>) {
    return plainToInstance(BusinessUnit, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}