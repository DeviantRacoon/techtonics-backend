import { Expose, Type, plainToInstance, instanceToPlain } from "class-transformer";

import Role from "./role";

export default class Permission {
  @Expose() permissionId?: number;
  @Expose() permissionName?: string;

  @Type(() => Role)
  @Expose()
  role?: Role[];

  constructor(data: Partial<Permission>) {
    return plainToInstance(Permission, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
