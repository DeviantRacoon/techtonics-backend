import { body } from "express-validator";
import userSessionRepository from "../../infrastructure/repositories/user-session.repository";

const existSession = async (sessionId: number) => {
  const session = await userSessionRepository.getOneByParams({ sessionId });
  return !!session;
};

export const closeSessionSchema = [
  body('sessionId')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
    .custom(existSession).withMessage('La sesión no existe.')
];
