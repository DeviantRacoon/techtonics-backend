import Person from "../../domain/models/person";
import { PersonEntity } from "../entities/person.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

class PersonRepository extends BaseRepository<PersonEntity> {
  constructor() { super(PersonEntity, 'person') }

  async getPersonsByParams(params: Record<string, any>): Promise<ResponseInterface<PersonEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy
    });
  };

  async getOnePersonByParams(filters: Record<string, any>): Promise<PersonEntity | null> {
    return this.findOneByParams({ filters });
  };

  async createPersonOrUpdate(person: Person): Promise<PersonEntity> {
    return this.repository.save(person.toJSON());
  };

}

const personRepository = new PersonRepository();
export default personRepository;
