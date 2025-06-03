import User from "../../domain/models/user";
import { UserEntity } from "../entities/user.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() { super(UserEntity, 'user'); }

  async getUsersByParams(params: Record<string, any>): Promise<ResponseInterface<UserEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy
    });
  };

  async getOneUserByParams(params: Record<string, any>): Promise<UserEntity | null> {
    return this.findOneByParams(params);
  };

  async createUserWithPerson(user: User) {
    const { person, ...userParams } = user.toJSON();

    const result = await this.repository.save({
      ...userParams, person: { ...person, }
    });

    return result;
  };

  async updateUserWithPerson(user: User) {
    const { person, userId, roleId, ...userParams } = user.toJSON();

    const result = await this.repository.save({
      userId,
      ...userParams,
      person: {
        ...person,
      },
      role: roleId ? { roleId } : undefined
    });

    return result;
  };

}

const userRepository = new UserRepository();
export default userRepository;