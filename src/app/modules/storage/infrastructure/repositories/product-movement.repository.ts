import ProductMovement from '../../domain/models/product-movement';
import { ProductMovementEntity } from '../entities/product-movement.entity';

import { BaseRepository } from '@app/core/bases/base.repository';
import { ResponseInterface } from '@app/core/interfaces';

class ProductMovementRepository extends BaseRepository<ProductMovementEntity> {
  constructor() { super(ProductMovementEntity, 'productMovement'); }

  async getProductMovementsByParams(params: Record<string, any>): Promise<ResponseInterface<ProductMovementEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    this.joinConfig = {
      user: 'left',
      product: 'left'
    };

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy,
      forceJoins: ['user', 'product']
    });
  }

  async getOneProductMovementByParams(filters: Record<string, any>): Promise<ProductMovementEntity | null> {
    this.joinConfig = {
      user: 'left',
      product: 'left'
    };

    return this.findOneByParams({
      filters,
      forceJoins: ['user', 'product']
    });
  }

  async createProductMovement(productMovement: ProductMovement): Promise<ProductMovementEntity> {
    const params = productMovement.toJSON();
    console.log(params);

    this.repository.create({ ...params, product: { productId: params.productId } });
    return this.repository.save(params);
  }
}

const productMovementRepository = new ProductMovementRepository();
export default productMovementRepository;

