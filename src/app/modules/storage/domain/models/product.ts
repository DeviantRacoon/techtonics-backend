import { Expose, Type, plainToInstance, instanceToPlain } from 'class-transformer';

import User from '@modules/users/domain/models/user';
import BusinessUnit from '@modules/users/domain/models/business-unit';

export type TYPE = 'ALMACEN' | 'SERVICIO';
export type STATUS = 'ACTIVO' | 'ELIMINADO' | 'AGOTADO';

export default class Product {
  @Expose() productId?: number;
  @Expose() productName?: string;
  @Expose() productImage?: string;
  @Expose() type?: TYPE;
  @Expose() stock?: number;
  @Expose() status?: STATUS;
  @Expose() createdAt?: string;
  @Expose() updatedAt?: string;

  @Type(() => User)
  @Expose()
  createdBy?: User;

  @Type(() => BusinessUnit)
  @Expose()
  businessUnit?: BusinessUnit;

  constructor(data: Partial<Product>) {
    return plainToInstance(Product, data, { excludeExtraneousValues: true });
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(instanceToPlain(this, { exposeUnsetFields: false }))
        .filter(([_, v]) => v !== null && v !== undefined)
    );
  }
}
