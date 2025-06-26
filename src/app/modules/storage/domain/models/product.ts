import { Expose, plainToInstance, instanceToPlain, Transform } from 'class-transformer';

export type TYPE = 'ALMACEN' | 'SERVICIO';
export type STATUS = 'ACTIVO' | 'ELIMINADO' | 'AGOTADO';

export default class Product {
  @Expose() productId?: number;
  @Expose() productName?: string;
  @Expose() productDescription?: string;
  @Expose() productImage?: string;
  @Expose() productCode?: string;
  @Transform(({ value }) => (value === '' ? null : value))
  @Expose() productPrice?: number;
  @Expose() type?: TYPE;
  @Transform(({ value }) => (value === '' ? null : value))
  @Expose() stock?: number;
  @Expose() status?: STATUS;
  @Expose() createdBy?: number;
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value))
  @Expose() businessUnitId?: number;
  @Expose() createdAt?: string;
  @Expose() updatedAt?: string;

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

