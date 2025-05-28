import prisma from "@libs/prisma";

import criterialHandler from "@utils/criterial.handler";
import paginateHandler from "@utils/paginate.handler";
import UserSession from "../../domain/models/user-session";

class UserSessionRepository {
  async getByParams(params: any) {
    const { user_session } = prisma;

    const allowedKeys = ['userId', 'device', 'status'];
    const relationKeys = ['user'];

    const { where, include } = criterialHandler({ params, allowedKeys, relationKeys });
    const paginate = { page: params.page || 1, limit: params.limit || 10 };

    const { data, total } = await paginateHandler(user_session, where, include, paginate);
    return { data, total };
  };

  async getOneByParams(params: any) {
    const { user_session } = prisma;

    const allowedKeys = ['sessionId', 'ip', 'token', 'status'];
    const relationKeys = ['user'];

    const query = criterialHandler({ params, allowedKeys, relationKeys });

    const session = await user_session.findFirst(query);
    return session;
  };

  async createSession(userSession: UserSession) {
    const result = await prisma.user_session.create({
      data: userSession.toJSON() as any
    });

    return result;
  };

  async updateSession(userSession: UserSession) {
    const result = await prisma.user_session.update({
      where: { sessionId: userSession.sessionId },
      data: userSession.toJSON() as any
    });

    return result;
  };
}

const userSessionRepository = new UserSessionRepository();
export default userSessionRepository;
