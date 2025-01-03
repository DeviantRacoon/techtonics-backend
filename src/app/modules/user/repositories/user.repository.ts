import User from "../models/user";

import prisma, { executeTransaction } from "@libs/prisma";

import criterialHandler from "@utils/criterial.handler";
import paginateHandler from "@utils/paginate.handler";

class UserRepository {

  async getUserByParams(params: any) {
    const { user_catalog } = prisma;

    const allowedKeys = ['userId', 'username', 'email', 'status'];
    const relationKeys = ['person', 'role', 'person.address'];

    const { where, include } = criterialHandler({ params, allowedKeys, relationKeys });
    const paginate = { page: params.page || 1, limit: params.limit || 10 };

    const { data, total } = await paginateHandler(user_catalog, where, include, paginate);
    return { data, total };
  }

  async getOneByParams(params: any) {
    const { user_catalog } = prisma;

    const allowedKeys = ['userId', 'username', 'email'];
    const relationKeys = ['person', 'role', 'person.address'];

    const query = criterialHandler({ params, allowedKeys, relationKeys });

    const user = await user_catalog.findFirst(query);
    return user;
  }

  async createUserWithPerson(user: User) {
    const { person, ...userParams } = user.toJSON();
  
    const result = await prisma.user_catalog.create({
      data: {
        ...userParams as any,
        person: {
          create: {
            ...person,
            address: {
              create: person.address.map((addr: any) => ({
                street: addr.street,
                number: addr.number,
                suburb: addr.suburb,
                city: addr.city,
                state: addr.state,
                country: addr.country,
                zipCode: addr.zipCode,
                status: "active",
              })),
            },
          },
        },
      },
    });
  
    return result;
  }
  

  async updateUserWithPerson(user: User) {
    const { person, userId, roleId, ...userParams } = user.toJSON();

    const result = await prisma.user_catalog.update({
      where: { userId },
      data: {
        ...userParams,
        person: {
          update: person
        },
        role: roleId ? { connect: { roleId: roleId } } : undefined
      }
    });

    return result;
  }

}

const userRepository = new UserRepository();
export default userRepository;