import { Request, Response, NextFunction } from "express";
import { RequestHandler, customErrorHandler } from "@core/bases/base.services";
import { Cacheable, InvalidateCache } from "@libs/cacheable";

import User from "../domain/models/user";
import userRepository from "../infrastructure/repositories/user.repository";

import { STATUS } from "../infrastructure/entities/user.entity";
import SessionService from "./session.service";

import { hashPassword, comparePassword } from "@libs/bcrypt";
import { generateToken } from "@libs/token";

export default class UserService {
  @RequestHandler
  @Cacheable({ keyPrefix: "users", ttl: 60 })
  static async getUser(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { data, total } = await userRepository.getUsersByParams(req.query);
    return { data, total };
  }

  @RequestHandler
  @Cacheable({ keyPrefix: "user", idParam: "userId", ttl: 60 })
  static async getOneUser(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await userRepository.getOneUserByParams(req.query);
    return user;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['users'] })
  static async userRegister(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = new User(req.body);
    user.status = "PENDIENTE";
    user.password = hashPassword(user.password!);

    await userRepository.createUserWithPerson(user);
    return { message: "Usuario creado con éxito" };
  }

  @RequestHandler
  @InvalidateCache({ keys: ['users'] })
  static async userUpdate(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = new User(req.body);
    if (user.password) {
      user.password = hashPassword(user.password);
    }
    await userRepository.updateUserWithPerson(user);
    return { message: "Se actualizo el usuario correctamente." };
  }

  @RequestHandler
  static async login(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email, password } = req.body;

    const user = await userRepository.getOneUserByParams({
      email,
      status: STATUS.ACTIVO,
    });
    !user && customErrorHandler("Credenciales invalidas", 401);

    const isValid = comparePassword(password, user!.password);
    !isValid && customErrorHandler("Credenciales invalidas", 401);

    const token = generateToken({
      userId: user!.userId,
      username: user!.username,
    });
    await SessionService.createSession(req, user!.userId!, token);

    res.setHeader("Authorization", token);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    return { ...user, token };
  }

  @RequestHandler
  @InvalidateCache({ keys: ['users'] })
  static async updateBusinessUnitsToUser(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId, businessUnits } = req.body;
    await userRepository.updateBusinessUnitsOfUser(userId, businessUnits);

    return { message: "Se actualizaron los datos del usuario correctamente." };
  }
}
