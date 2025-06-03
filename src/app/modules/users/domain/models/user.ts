import { Expose, Transform, Type, plainToInstance, instanceToPlain } from "class-transformer";

import Role from "./role";
import Person from "./person";

export type STATUS = "ACTIVO" | "INACTIVO" | "PENDIENTE" | "ELIMINADO";

export default class User {
  @Expose() public userId?: number;
  @Expose() public personId?: number;
  @Expose() public roleId?: number;
  @Expose() public email?: string;
  @Expose() public password?: string;
  @Expose() public code?: string;
  @Expose() public status?: STATUS;
  @Expose() public createdAt?: string;
  @Expose() public updatedAt?: string;

  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  @Expose() public username?: string;

  @Type(() => Person)
  @Expose()
  public person?: Person;

  @Type(() => Role)
  @Expose()
  public role?: Role;

  constructor(data: Partial<User>) {
    return plainToInstance(User, data, { excludeExtraneousValues: true });
  }
  
  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
