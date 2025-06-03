import { Expose, Type, plainToInstance, instanceToPlain } from "class-transformer";

import User from "./user";
import Permission from "./permission";

type STATUS = "ACTIVO" | "ELIMINADO";

export default class Role {
  @Expose() roleId?: number;
  @Expose() roleName?: string;
  @Expose() status?: STATUS;
  @Expose() createdAt?: string;
  @Expose() updatedAt?: string;

  @Type(() => User)
  @Expose()
  users?: User;

  @Type(() => Permission)
  @Expose()
  permission?: Permission[];

  constructor(data: Partial<Role>) {
    return plainToInstance(Role, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
