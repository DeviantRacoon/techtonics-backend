import User from "../../domain/models/user";
import { UserEntity } from "../entities/user.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() { super(UserEntity, 'user'); }

  async getUsersByParams(params: Record<string, any>): Promise<ResponseInterface<UserEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    this.joinConfig = {
      person: "left",
      businessUnits: "left"
    };

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy,
      forceJoins: ['role', 'person', 'businessUnits']
    });
  };

  async getOneUserByParams(params: Record<string, any>): Promise<UserEntity | null> {
    this.joinConfig = {
      "role.permissions": "left",
      person: "left",
      businessUnits: "left"
    };

    return this.findOneByParams({
      filters: params,
      forceJoins: ['role.permissions', 'person', 'businessUnits']
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
      userId: userId,
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

  async updateBusinessUnitsOfUser(userId: number, businessUnitIds: any) {
    const user = await this.repository.findOne({
      where: { userId },
      relations: ['businessUnits']
    });

    await this.repository
      .createQueryBuilder()
      .relation('UserEntity', 'businessUnits')
      .of(userId)
      .remove(user?.businessUnits ?? []);

    if (businessUnitIds.length > 0) {
      await this.repository
        .createQueryBuilder()
        .relation('UserEntity', 'businessUnits')
        .of(userId)
        .add(businessUnitIds);
    }

    return await this.repository.findOne({
      where: { userId },
      relations: ['businessUnits']
    });
  }

};

const userRepository = new UserRepository();
export default userRepository;