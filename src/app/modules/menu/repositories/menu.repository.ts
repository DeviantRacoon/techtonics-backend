import prisma from "@libs/prisma";

import Menu from "../models/menu";

import criterialHandler from "@utils/criterial.handler";
import paginateHandler from "@utils/paginate.handler";

class MenuRepository {
  async getByParams(params: any) {
    const { menu_catalog } = prisma;

    const allowedKeys = ["menuId", "menuName", "status"];
    const relationKeys = ["section"];

    const { where, include } = criterialHandler({ params, allowedKeys, relationKeys });
    const paginate = { page: params.page || 1, limit: params.limit || 10 };

    const { data, total } = await paginateHandler(menu_catalog, where, include, paginate);
    return { data, total };
  }

  async getOneByParams(params: any) {
    const { menu_catalog } = prisma;

    const allowedKeys = ["menuId", "menuName", "status"];
    const relationKeys = ["user"];

    const query = criterialHandler({ params, allowedKeys, relationKeys });

    const menu = await menu_catalog.findFirst(query);
    return menu;
  }

  async getMenusByRole(roleId: number) {
    const { menu_catalog } = prisma;

    const sectionWhere = {
      status: "active",
      permission: {
        some: {
          status: "active",
          roleId,
        },
      },
    };

    const where = {
      section: {
        some: sectionWhere,
      },
    };

    const include = {
      section: {
        where: sectionWhere,
        include: {
          permission: {
            where: {
              status: "active",
              roleId,
            },
          },
        },
      }
    };

    const menus = await menu_catalog.findMany({
      where,
      include,
      orderBy: { menuId: "desc" },
    });

    return menus;
  }  


  async createOrUpdate(menu: Menu) {
    let result;

    if (menu.menuId) {
      result = await prisma.menu_catalog.update({
        where: { menuId: menu.menuId },
        data: menu.toJSON(),
      });
    } else {
      result = await prisma.menu_catalog.create({
        data: menu.toJSON() as any,
      });
    }

    return result;
  }
}

const menuRepository = new MenuRepository();
export default menuRepository;
