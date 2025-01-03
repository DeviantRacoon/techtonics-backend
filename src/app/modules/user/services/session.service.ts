import { Request } from "express";
import { customErrorHandler, requestHandler } from "@utils/request.handler";

import UserSession from "../models/user-session";
import userSessionRepository from "../repositories/user-session.repository";

import { addDays } from "date-fns";

export const getSessions = requestHandler(async (req: Request) => {
  const { data, total } = await userSessionRepository.getByParams(req.query);
  return { data, total };
});

export const getOneUser = requestHandler(async (req: Request) => {
  const session = await userSessionRepository.getOneByParams(req.query);
  return session;
});

export const closeSession = requestHandler(async (req: Request) => {
  const session = new UserSession(req.body);
  session.status = "inactive";

  await userSessionRepository.updateSession(session);
  return session;
});

export const banSession = requestHandler(async (req: Request) => {
  const session = new UserSession(req.body);
  session.status = "ban";

  await userSessionRepository.updateSession(session);
  return session;
});

export const createSession = async (req: Request, userId: number, token: string) => {
  const session = new UserSession({
    userId,
    token,
    ip: req.ip || "S/N",
    device: req.headers["user-agent"] || "S/N",
    status: "active",
    expiresAt: addDays(new Date(), 7).toISOString(),
  });

  await userSessionRepository.createSession(session);
  return session;
};

// export const userRegister = requestHandler(async (req: Request) => {
//   const user = new User(req.body);

//   user.status = "pending";
//   user.password = hashPassword(user.password!);
//   user.person!.birthdate = new Date(user.person?.birthdate!);

//   const result = await userSessionRepository.createUserWithPerson(user);
//   return result;
// });

// export const userUpdate = requestHandler(async (req: Request) => {
//   const user = new User(req.body);
//   const result = await userSessionRepository.updateUserWithPerson(user);
//   return result;
// });

// export const login = requestHandler(async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await userSessionRepository.getOneByParams({ email });
//   !user && customErrorHandler("Credenciales invalidas", 401);

//   const isValid = comparePassword(password, user!.password);
//   !isValid && customErrorHandler("Credenciales invalidas", 401);
//   console.log("Login success");

//   const token = generateToken({ userId: user!.userId, username: user!.username });
//   const refreshToken = generateRefreshToken({ userId: user!.userId, username: user!.username });

//   res.setHeader("Authorization", `Bearer ${token}`);
//   res.setHeader("x-refresh-token", refreshToken);

//   return;
// });


