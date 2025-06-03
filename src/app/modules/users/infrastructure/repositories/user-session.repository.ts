import UserSession from "../../domain/models/user-session";
import { UserSessionEntity } from "../entities/user-session.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

class UserSessionRepository extends BaseRepository<UserSessionEntity> {
  constructor() { super(UserSessionEntity, 'userSession'); }

  async getUserSessionsByParams(params: Record<string, any>): Promise<ResponseInterface<UserSessionEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy
    });
  };

  async getOneUserSessionByParams(params: Record<string, any>): Promise<UserSessionEntity | null> {
    return this.findOneByParams(params);
  };

  async createUserSessionOrUpdate(userSession: UserSession): Promise<UserSessionEntity> {
    return this.repository.save(userSession.toJSON());
  };
}

const userSessionRepository = new UserSessionRepository();
export default userSessionRepository;
