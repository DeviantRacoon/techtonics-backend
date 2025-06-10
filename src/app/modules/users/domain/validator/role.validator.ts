import { body } from "express-validator";

import roleRepository from "../../infrastructure/repositories/role.repository";

const existRole = async (roleId: number) => {
  const role = await roleRepository.getOneRoleByParams({ roleId });
  if (!role) {
    throw new Error('El rol no existe.');
  }
};

const existAllPermission = async (permissions: []) => {
  const exists = await roleRepository.existAllPermission(permissions.map((permission: any) => permission.permissionId));
  if (!exists) {
    throw new Error('Los permisos no son válidos.');
  }
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

export const addPermissionToRoleSchema = [
  body('roleId')
    .custom(existRole).withMessage('El rol no existe.')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
  ,
  body('permissions')
    .notEmpty().withMessage('Los permisos son requeridos.')
    .custom(existAllPermission).withMessage('Los permisos no son validos.')
    .isArray().withMessage('Las permisos deben ser un arreglo.')
];