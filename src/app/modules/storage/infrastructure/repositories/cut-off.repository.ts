import CutOff from '../../domain/models/cut-off';
import { CutOffEntity } from '../entities/cut-off.entity';

import { BaseRepository } from '@app/core/bases/base.repository';
import { ResponseInterface } from '@app/core/interfaces';

class CutOffRepository extends BaseRepository<CutOffEntity> {
  constructor() { super(CutOffEntity, 'cutOff'); }

  async getCutOffsByParams(params: Record<string, any>): Promise<ResponseInterface<CutOffEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    this.joinConfig = {
      user: 'left'
    };

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy,
      forceJoins: ['user']
    });
  }

  async getOneCutOffByParams(filters: Record<string, any>): Promise<CutOffEntity | null> {
    this.joinConfig = {
      user: 'left'
    };

    return this.findOneByParams({
      filters,
      forceJoins: ['user']
    });
  }

  async createCutOff(cutOff: CutOff): Promise<CutOffEntity> {
    const params = cutOff.toJSON();

    this.repository.create({ ...params, user: { userId: params.userId } });
    return this.repository.save(params);
  }
}

const cutOffRepository = new CutOffRepository();
export default cutOffRepository;
