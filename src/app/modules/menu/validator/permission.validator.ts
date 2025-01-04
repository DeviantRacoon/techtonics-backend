import { body } from "express-validator";
import menuRepository from "../repositories/menu.repository";

const exist = async (menuId: number) => {
  const isValid = await menuRepository.getByParams({ menuId });
  if (!isValid) return false;
};

export const createPermissionSchema = [
  body('roleId')
    .notEmpty().withMessage('El rol es requerido.')
    .isNumeric().withMessage('El rol debe ser un número.'),
  body('sectionId')
    .notEmpty().withMessage('La sección es requerida.')
    .isNumeric().withMessage('La sección debe ser un número.'),
];

export const updatePermissionSchema = [
  body('permissionId')
    .custom(exist).withMessage('El menú no existe.')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
];
