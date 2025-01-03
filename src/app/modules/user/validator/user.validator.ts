import { body, check } from 'express-validator';

import userRepository from '../repositories/user.repository';
import personRepository from '../repositories/person.repository';
import userSessionRepository from '../repositories/user-session.repository';

const uniqueField = (field: string, repository: any) => {
  return async (value: string, helpers: any) => {
    const filter = { [field]: value };
    const record = await repository.getOneByParams(filter);
    if (record) return helpers.error('any.custom');
  };
};

const existUser = async (userId: number, helpers: any) => {
  const user = await userRepository.getOneByParams({ userId });
  if (!user) return helpers.error('any.custom');
};

const isIpBanned = async (ip: string, helpers: any) => {
  const bannedIp = await userSessionRepository.getOneByParams({ ip, status: 'ban' });
  if (bannedIp) return helpers.error('any.custom');
};

export const createUserSchema = [
  body('username')
    .notEmpty().withMessage('El nombre es requerido.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.')
    .custom(uniqueField('username', userRepository)).withMessage('El nombre de usuario ya está en uso.'),

  body('email')
    .notEmpty().withMessage('El correo es requerido.')
    .isEmail().withMessage('El correo debe ser un correo válido.')
    .custom(uniqueField('email', userRepository)).withMessage('El correo ya está en uso.'),

  body('password')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),

  body('person.firstName')
    .notEmpty().withMessage('El nombre es requerido.'),

  body('person.lastName')
    .notEmpty().withMessage('El apellido es requerido.'),

  body('person.secondLastName')
    .notEmpty().withMessage('El apellido es requerido.'),

  body('person.birthdate')
    .notEmpty().withMessage('La fecha de nacimiento es requerida.')
    .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida.'),

  body('person.curp')
    .notEmpty().withMessage('El CURP es requerido.')
    .custom(uniqueField('curp', personRepository)).withMessage('El CURP ya está en uso.')
    .isLength({ min: 18 }).withMessage('El CURP debe tener al menos 18 caracteres.'),

  body('person.cellphone')
    .notEmpty().withMessage('El teléfono es requerido.')
    .isLength({ min: 10 }).withMessage('El teléfono debe tener al menos 10 caracteres.'),

  body('person.gender')
    .notEmpty().withMessage('El género es requerido.')
    .isLength({ max: 1 }).withMessage('El género debe tener un máximo de 1 carácter.'),
];

export const updateUserSchema = [
  body('userId')
    .notEmpty().withMessage('El id es requerido.')
    .custom(existUser).withMessage('El usuario no existe.')
    .isNumeric().withMessage('El id debe ser un número.'),

  body('username')
    .optional()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.')
    .custom(uniqueField('username', userRepository)).withMessage('El nombre de usuario ya está en uso.'),

  body('email')
    .optional()
    .isEmail().withMessage('El correo debe ser un correo válido.')
    .custom(uniqueField('email', userRepository)).withMessage('El correo ya está en uso.'),

  body('person.curp')
    .optional()
    .isLength({ min: 18 }).withMessage('El CURP debe tener al menos 18 caracteres.')
    .custom(uniqueField('curp', personRepository)).withMessage('El CURP ya está en uso.'),

  body('person.cellphone')
    .optional()
    .isLength({ min: 10 }).withMessage('El teléfono debe tener al menos 10 caracteres.'),

  body('person.birthdate')
    .optional()
    .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida.'),
];

export const loginSchema = [
  check('ip')
    .custom(isIpBanned).withMessage('La ip está bloqueada.'),

  body('email')
    .notEmpty().withMessage('El correo es requerido.')
    .isEmail().withMessage('El correo debe ser un correo válido.'),

  body('password')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
];