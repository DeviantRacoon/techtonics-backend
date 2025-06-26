import Product from '../../domain/models/product';
import { ProductEntity } from '../entities/product.entity';

import { BaseRepository } from '@app/core/bases/base.repository';
import { ResponseInterface } from '@app/core/interfaces';

class ProductRepository extends BaseRepository<ProductEntity> {
  constructor() { super(ProductEntity, 'product'); }

  async getProductsByParams(params: Record<string, any>): Promise<ResponseInterface<ProductEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    this.joinConfig = {
      createdBy: 'left',
      businessUnit: 'left'
    };

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy,
      forceJoins: ['createdBy', 'businessUnit']
    });
  }

  async getOneProductByParams(filters: Record<string, any>): Promise<ProductEntity | null> {
    this.joinConfig = {
      createdBy: 'left',
      businessUnit: 'left'
    };

    return this.findOneByParams({
      filters,
      forceJoins: ['createdBy', 'businessUnit']
    });
  }

  async createProduct(product: Product): Promise<ProductEntity> {
    const params = product.toJSON();
    console.log(params);

    this.repository.create({ ...params, businessUnit: { businessUnitId: params.businessUnitId } });
    return this.repository.save(params);
  }
}

const productRepository = new ProductRepository();
export default productRepository;
