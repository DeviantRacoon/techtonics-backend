import { Request } from "express";
import { requestHandler } from "@core/bases/base.services";

import UserSession from "../domain/models/user-session";
import userSessionRepository from "../infrastructure/repositories/user-session.repository";

import { addHours } from "date-fns";

export const getSessions = requestHandler(async (req: Request) => {
  const { data, total } = await userSessionRepository.getUserSessionsByParams(req.query);
  return { data, total };
});

export const getOneUser = requestHandler(async (req: Request) => {
  const session = await userSessionRepository.getOneUserSessionByParams(req.query);
  return session;
});

export const closeSession = requestHandler(async (req: Request) => {
  const session = new UserSession(req.body);
  session.status = "ELIMINADO";

  await userSessionRepository.createUserSessionOrUpdate(session);
  return session;
});

export const closeOneSession = requestHandler(async (req: Request) => {
  const token = req.headers['authorization'];
  if (!token)  return;
  
  await userSessionRepository.updateSessionByToken(token);
  return;
});

export const banSession = requestHandler(async (req: Request) => {
  const session = new UserSession(req.body);
  session.status = "BANEADO";

  await userSessionRepository.createUserSessionOrUpdate(session);
  return session;
});

export const createSession = async (req: Request, userId: number, token: string) => {
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
};