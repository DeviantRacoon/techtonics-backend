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
      orderBy,
      forceJoins: ['user']
    });
  };

  async getOneUserSessionByParams(filters: Record<string, any>): Promise<UserSessionEntity | null> {
    return this.findOneByParams({ filters });
  };

  async createUserSessionOrUpdate(userSession: any): Promise<UserSessionEntity> {
    return this.repository.save(userSession);
  };

  async updateSessionByToken(token: string): Promise<void> {
    await this.repository.update({ token }, { status: "ELIMINADO" });
  };
}

const userSessionRepository = new UserSessionRepository();
export default userSessionRepository;
