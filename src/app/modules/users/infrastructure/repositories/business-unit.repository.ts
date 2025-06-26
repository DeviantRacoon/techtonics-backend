import BusinessUnit from "../../domain/models/business-unit";
import { BusinessUnitEntity } from "../entities/business-unit.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

class BusinessUnitRepository extends BaseRepository<BusinessUnitEntity> {
  constructor() { super(BusinessUnitEntity, 'businessUnit'); }

  async getBusinessUnitsByParams(params: Record<string, any>): Promise<ResponseInterface<BusinessUnitEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    this.joinConfig = {
      users: 'left'
    };

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy,
      forceJoins: ['users']
    });
  }

  async getOneBusinessUnitByParams(params: Record<string, any>): Promise<BusinessUnitEntity | null> {
    return this.findOneByParams({
      filters: params
    });
  }

  async createBusinessUnitOrUpdate(businessUnit: BusinessUnit) {
    const { ...businessUnitParams } = businessUnit.toJSON();

    const result = await this.repository.save({
      ...businessUnitParams
    });

    return result;
  }
}

const businessUnitRepository = new BusinessUnitRepository();
export default businessUnitRepository;
