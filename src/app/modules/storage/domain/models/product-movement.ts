import { Expose, plainToInstance, instanceToPlain, Transform } from 'class-transformer';

import Product from './product';
import User from '@app/modules/users/domain/models/user';

export type STATUS = 'ACTIVO' | 'ELIMINADO';
export type MOVEMENT_TYPE = 'ENTRADA' | 'SALIDA';

export default class ProductMovement {
  @Expose() productMovementId?: number;
  @Expose() productMovementType?: MOVEMENT_TYPE;
  @Expose() quantity?: number;
  @Expose() product?: Product;
  @Expose() user?: User;
  @Expose() status?: STATUS;
  @Expose() cutoffDate?: string;
  @Expose() createdAt?: string;
  @Expose() updatedAt?: string;

  constructor(data: Partial<ProductMovement>) {
    return plainToInstance(ProductMovement, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}

