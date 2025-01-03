import { body } from "express-validator";
import roleRepository from "../repositories/role.repository";

const existRole = async (roleId: number) => {
  const role = await roleRepository.getOneRoleByParams({ roleId });
  if (!role) return false;
};

export const createRoleSchema = [
  body('roleName')
    .notEmpty().withMessage('El nombre es requerido.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.')
];

export const updateRoleSchema = [
  body('roleId')
    .custom(existRole).withMessage('El rol no existe.')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
];
