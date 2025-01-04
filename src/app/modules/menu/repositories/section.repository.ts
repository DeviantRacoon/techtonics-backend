import prisma from "@libs/prisma";

import Section from "../models/section";

import criterialHandler from "@utils/criterial.handler";
import paginateHandler from "@utils/paginate.handler";

class SectionRepository {
  async getByParams(params: any) {
    const { section_catalog } = prisma;

    const allowedKeys = ['sectionId', 'sectionName', 'status'];
    const relationKeys = ['permission', 'role', 'menu'];

    const { where, include } = criterialHandler({ params, allowedKeys, relationKeys });
    const paginate = { page: params.page || 1, limit: params.limit || 10 };

    const { data, total } = await paginateHandler(section_catalog, where, include, paginate);
    return { data, total };
  };

  async getOneByParams(params: any) { 
    const { section_catalog } = prisma;

    const allowedKeys = ['sectionId', 'sectionName', 'status'];
    const relationKeys = ['permission', 'role', 'menu'];

    const query = criterialHandler({ params, allowedKeys, relationKeys });

    const section = await section_catalog.findFirst(query);
    return section;
  };

  async createOrUpdate(section: Section) {
    let result;

    if (section.sectionId) {
      result = await prisma.section_catalog.update({
        where: { sectionId: section.sectionId },
        data: section.toJSON()
      });
    } else {
      result = await prisma.section_catalog.create({
        data: section.toJSON() as any
      });
    }
    return result;
  };
}

const sectionRepository = new SectionRepository();
export default sectionRepository;
