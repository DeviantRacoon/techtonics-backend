import { body } from 'express-validator';
import cutOffRepository from '../../infrastructure/repositories/cut-off.repository';

const existCutOff = async (cutOffId: number) => {
  const cutOff = await cutOffRepository.getOneCutOffByParams({ cutOffId });
  if (!cutOff) {
    throw new Error('El corte no existe.');
  }
};

export const createCutOffSchema = [
  body('userId')
    .notEmpty().withMessage('El id del usuario es requerido.')
    .isNumeric().withMessage('El id del usuario debe ser un número.'),
  body('totalEntries')
    .notEmpty().withMessage('El total de entradas es requerido.')
    .isNumeric().withMessage('El total de entradas debe ser un número.'),
  body('totalOutputs')
    .notEmpty().withMessage('El total de salidas es requerido.')
    .isNumeric().withMessage('El total de salidas debe ser un número.'),
  body('totalCash')
    .notEmpty().withMessage('El total de efectivo es requerido.')
    .isNumeric().withMessage('El total de efectivo debe ser un número.'),
];

export const updateCutOffSchema = [
  body('cutOffId')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
    .custom(existCutOff).withMessage('El corte no existe.')
];
