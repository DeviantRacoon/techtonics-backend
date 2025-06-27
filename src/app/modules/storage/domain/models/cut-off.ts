import { Expose, plainToInstance, instanceToPlain, Type } from 'class-transformer';
import User from '@app/modules/users/domain/models/user';

export type STATUS = 'ACTIVO' | 'ELIMINADO';

export default class CutOff {
  @Expose() cutOffId?: number;
  @Type(() => User)
  @Expose() user?: User;
  @Expose() totalEntries?: number;
  @Expose() totalOutputs?: number;
  @Expose() totalCash?: number;
  @Expose() cutoffDate?: string;
  @Expose() status?: STATUS;
  @Expose() createdAt?: string;

  constructor(data: Partial<CutOff>) {
    return plainToInstance(CutOff, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
