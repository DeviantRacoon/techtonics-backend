import { Request } from "express";
import { requestHandler } from "@core/bases/base.services";

import UserSession from "../domain/models/user-session";
import userSessionRepository from "../infrastructure/repositories/user-session.repository";

import { addDays } from "date-fns";

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

export const banSession = requestHandler(async (req: Request) => {
  const session = new UserSession(req.body);
  session.status = "BANEADO";

  await userSessionRepository.createUserSessionOrUpdate(session);
  return session;
});

export const createSession = async (req: Request, userId: number, token: string) => {
  const session = new UserSession({
    userId,
    token,
    ip: req.ip || "S/N",
    device: req.headers["user-agent"] || "S/N",
    status: "ACTIVO",
    expiresAt: addDays(new Date(), 7).toISOString(),
  });

  await userSessionRepository.createUserSessionOrUpdate(session);
  return session;
};