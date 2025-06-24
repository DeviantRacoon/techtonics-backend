import { body } from "express-validator";

import businessUnitRepository from "../../infrastructure/repositories/business-unit.repository";

const existBusinessUnit = async (businessUnitId: number) => {
  const businessUnit = await businessUnitRepository.getOneBusinessUnitByParams({ businessUnitId });
  if (!businessUnit) {
    throw new Error('La unidad de negocio no existe.');
  }
};

const existBusinessUnitName = async (businessUnitName: string) => {
  const businessUnit = await businessUnitRepository.getOneBusinessUnitByParams({ businessUnitName });
  if (businessUnit) {
    throw new Error('La unidad de negocio existe.');
  }
};

export const createBusinessUnitSchema = [
  body('businessUnitName')
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .custom(existBusinessUnitName).withMessage('La unidad de negocio ya existe.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.')
];

export const updateBusinessUnitSchema = [
  body('businessUnitId')
    .custom(existBusinessUnit).withMessage('La unidad de negocio no existe.')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
];