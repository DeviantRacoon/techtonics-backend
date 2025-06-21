import User from "../../domain/models/user";
import { UserEntity } from "../entities/user.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() { super(UserEntity, 'user'); }

  async getUsersByParams(params: Record<string, any>): Promise<ResponseInterface<UserEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    this.joinConfig = {
      person: "left"
    };

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy,
      forceJoins: ['role', 'person']
    });
  };

  async getOneUserByParams(params: Record<string, any>): Promise<UserEntity | null> {
    this.joinConfig = {
      "role.permissions": "left",
      person: "left"
    };

    return this.findOneByParams({
      filters: params,
      forceJoins: ['role.permissions', 'person']
    });
  };

  async createUserWithPerson(user: User) {
    const { person, ...userParams } = user.toJSON();

    const result = await this.repository.save({
      ...userParams, person: { ...person, }
    });

    return result;
  };

  async updateUserWithPerson(user: User) {
    const { person, userId, role, ...userParams } = user.toJSON();

    const result = await this.repository.preload({
      userId,
      ...userParams,
      person: {
        ...person,
      },
      role: role?.roleId ? { roleId: role.roleId } : undefined
    });

    if (!result) {
      throw new Error('El usuario no existe.');
    }

    await this.repository.save(result);

    return result;
  };

}

const userRepository = new UserRepository();
export default userRepository;