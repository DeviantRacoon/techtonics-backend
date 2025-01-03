import User from "../models/user";

import prisma from "@libs/prisma";

import criterialHandler from "@utils/criterial.handler";
import paginateHandler from "@utils/paginate.handler";

class PersonRepository {

  async getPersonsByParams(params: any) {
    const { person_catalog } = prisma;

    const allowedKeys = ['userId', 'curp', 'cellphone', 'gender', 'status'];

    const { where, include } = criterialHandler({ params, allowedKeys });
    const paginate = { page: params.page || 1, limit: params.limit || 10 };

    const { data, total } = await paginateHandler(person_catalog, where, include, paginate);

    return { data, total };
  };

  async getOneByParams(params: any) {
    const { person_catalog } = prisma;

    const allowedKeys = ['personId', 'firstName', 'curp'];
    const query = criterialHandler({ params, allowedKeys });

    const person = await person_catalog.findFirst(query);
    return person;
  };

}

const personRepository = new PersonRepository();
export default personRepository;
