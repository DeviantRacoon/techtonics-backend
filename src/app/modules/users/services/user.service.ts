import { Request, Response } from "express";
import { customErrorHandler, requestHandler } from "@utils/request.handler";

import User from "../domain/models/user";
import userRepository from "../infrastructure/repositories/user.repository";

import { createSession } from "./session.service";

import { hashPassword, comparePassword } from "@libs/bcrypt";
import { generateToken, generateRefreshToken } from "@libs/token";

export const getUser = requestHandler(async (req: Request) => {
  const { data, total } = await userRepository.getUserByParams(req.query);
  return { data, total };
});

export const getOneUser = requestHandler(async (req: Request) => {
  const user = await userRepository.getOneByParams(req.query);
  return user;
});

export const userRegister = requestHandler(async (req: Request) => {
  const user = new User(req.body);

  user.status = "PENDIENTE";
  user.password = hashPassword(user.password!);

  await userRepository.createUserWithPerson(user);
  return { message: "Usuario creado con éxito" };
});

export const userUpdate = requestHandler(async (req: Request) => {
  const user = new User(req.body);
  await userRepository.updateUserWithPerson(user);

  return { message: "Se actualizo el usuario correctamente." };
});

export const login = requestHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.getOneByParams({ email });
  !user && customErrorHandler("Credenciales invalidas", 401);

  const isValid = comparePassword(password, user!.password);
  !isValid && customErrorHandler("Credenciales invalidas", 401);

  const token = generateToken({ userId: user!.userId, username: user!.username });
  const refreshToken = generateRefreshToken({ userId: user!.userId, username: user!.username });

  await createSession(req, user!.userId!, refreshToken);

  res.setHeader("Authorization", `Bearer ${token}`);
  res.setHeader("x-refresh-token", refreshToken);

  return user;
});


