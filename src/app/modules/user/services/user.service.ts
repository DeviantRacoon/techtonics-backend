import { Request, Response } from "express";
import { customErrorHandler, requestHandler } from "@utils/request.handler";

import User from "../models/user";
import userRepository from "../repositories/user.repository";

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

  user.status = "pending";
  user.password = hashPassword(user.password!);
  user.person!.birthdate = new Date(user.person?.birthdate!);

  const result = await userRepository.createUserWithPerson(user);
  return result;
});

export const userUpdate = requestHandler(async (req: Request) => {
  const user = new User(req.body);
  const result = await userRepository.updateUserWithPerson(user);
  return result;
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


