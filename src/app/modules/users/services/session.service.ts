import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "@core/bases/base.services";
import { Cacheable, InvalidateCache } from "@libs/cacheable";

import UserSession from "../domain/models/user-session";
import userSessionRepository from "../infrastructure/repositories/user-session.repository";

import { addHours } from "date-fns";

export default class SessionService {
  @RequestHandler
  @Cacheable({ keyPrefix: "sessions", ttl: 60 })
  static async getSessions(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { data, total } = await userSessionRepository.getUserSessionsByParams(req.query);
    return { data, total };
  }

  @RequestHandler
  @Cacheable({ keyPrefix: "session", idParam: "userId", ttl: 60 })
  static async getOneUser(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const session = await userSessionRepository.getOneUserSessionByParams(req.query);
    return session;
  }

  @RequestHandler
  @InvalidateCache({ keys: (req: Request) => ['sessions', `session:${req.body.userId}`] })
  static async closeSession(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const session = new UserSession(req.body);
    session.status = "ELIMINADO";

    await userSessionRepository.createUserSessionOrUpdate(session);
    return session;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['sessions'] })
  static async closeOneSession(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers["authorization"];
    if (!token) return;

    await userSessionRepository.updateSessionByToken(token as string);
    return;
  }

  @RequestHandler
  @InvalidateCache({ keys: (req: Request) => ['sessions', `session:${req.body.userId}`] })
  static async banSession(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const session = new UserSession(req.body);
    session.status = "BANEADO";

    await userSessionRepository.createUserSessionOrUpdate(session);
    return session;
  }

  static async createSession(
    this: void,
    req: Request,
    userId: number,
    token: string
  ) {
    const session = {
      user: { userId },
      token,
      ip: req.ip || "S/N",
      device: req.headers["user-agent"] || "S/N",
      status: "ACTIVO",
      expiresAt: addHours(new Date(), 4).toISOString(),
    };

    await userSessionRepository.createUserSessionOrUpdate(session);
    return session;
  }
}
