import { Expose, Type, plainToInstance, instanceToPlain } from "class-transformer";

import User from "./user";

type SESSION_STATUS = "ACTIVO" | "ELIMINADO" | "BANEADO";

export default class UserSession {
  @Expose() sessionId?: number;
  @Expose() userId?: number;
  @Expose() token?: string;
  @Expose() device?: string;
  @Expose() ip?: string;
  @Expose() status?: SESSION_STATUS;
  @Expose() createdAt?: string;
  @Expose() expiresAt?: string;

  @Type(() => User)
  @Expose()
  user?: User;

  constructor(data: Partial<UserSession>) {
    return plainToInstance(UserSession, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
