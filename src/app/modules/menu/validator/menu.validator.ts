import { body } from "express-validator";
import menuRepository from "../repositories/menu.repository";

const exist = async (menuId: number) => {
  const isValid = await menuRepository.getByParams({ menuId });
  if (!isValid) return false;
};

export const createMenuSchema = [
  body('menuName')
    .notEmpty().withMessage('El nombre es requerido.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.')
];

export const updateMenuSchema = [
  body('menuId')
    .custom(exist).withMessage('El menú no existe.')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
];
