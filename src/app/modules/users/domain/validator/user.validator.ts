import { body } from 'express-validator';

import userRepository from '../../infrastructure/repositories/user.repository';
import personRepository from '../../infrastructure/repositories/person.repository';
import userSessionRepository from '../../infrastructure/repositories/user-session.repository';

import { parseISO, isDate } from 'date-fns';
import { STATUS } from '../../infrastructure/entities/user-session.entity';

const uniquePersonField = (field: string) => {
  return async (value: string, helpers: any) => {
    if (!value || value.length === 0) return true;
    const filter = { [field]: value };
    const record = await personRepository.getOnePersonByParams(filter);

    if (record) return helpers.error('any.custom');
  };
};

const uniqueUserField = (field: string) => {
  return async (value: string, helpers: any) => {
    if (!value || value.length === 0) return true;
    const filter = { [field]: value };
    const record = await userRepository.getOneUserByParams(filter);

    if (record) return helpers.error('any.custom');
  };
};

const uniqueFieldExceptOwner = (field: string, repository: any, ownerField: string, getOwnerId: (body: any) => any) => {
  return async (value: string, { req }: any) => {
    if (!value || value.length === 0) return true;

    const ownerId = getOwnerId(req.body);
    const filter = { [field]: value, [`${ownerField}!=`]: ownerId };

    let record: any = null;
    if (repository === personRepository) {
      record = await personRepository.getOnePersonByParams(filter);
    } else {
      record = await userRepository.getOneUserByParams(filter);
    }

    if (record) throw new Error('No valido.');
    return record;
  };
};

const existUser = async (userId: number, helpers: any) => {
  const user = await userRepository.getOneUserByParams({ userId });
  if (!user) return helpers.error('any.custom');
};

const isIpBanned = async (_: any, { req }: any) => {
  const ip = req.ip;

  const bannedIp = await userSessionRepository.getOneUserSessionByParams({ ip, status: STATUS.BANEADO, });
  if (bannedIp) throw new Error('Error al iniciar sesión.');
};

export const createUserSchema = [
  body('username')
    .notEmpty().withMessage('El nombre de usuario es requerido.')
    .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres.')
    .isLength({ max: 20 }).withMessage('El nombre de usuario debe tener un máximo de 20 caracteres.')
    .custom(uniqueUserField('username')).withMessage('Esta persona ya existe como usuario.'),

  body('email')
    .notEmpty().withMessage('El correo es requerido.')
    .isEmail().withMessage('El correo debe ser un correo válido.')
    .custom(uniqueUserField('email')).withMessage('El correo ya está en uso.'),

  body('password')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),

  body('person.names')
    .notEmpty().withMessage('El nombre es requerido.'),

  body('person.secondLastName')
    .notEmpty().withMessage('El apellido es requerido.'),

  body('person.birthdate')
    .notEmpty().withMessage('La fecha de nacimiento es requerida.')
    .custom((value: string) => {
      const date = parseISO(value);
      return isDate(date) && !isNaN(date.getTime());
    }).withMessage('La fecha de nacimiento debe ser una fecha válida.'),

  body('person.curp')
    .notEmpty().withMessage('El CURP es requerido.')
    .custom(uniquePersonField('curp')).withMessage('El CURP ya está en uso.')
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
    .custom(uniqueFieldExceptOwner('username', userRepository, 'userId',
      (body: any) => body.userId)).withMessage('El nombre de usuario ya está en uso.'),

  body('email')
    .optional()
    .isEmail().withMessage('El correo debe ser un correo válido.')
    .custom(uniqueFieldExceptOwner('email', userRepository, 'userId',
      (body: any) => body.userId)).withMessage('El correo ya está en uso.'),

  body('person.curp')
    .optional()
    .isLength({ min: 18 }).withMessage('El CURP debe tener al menos 18 caracteres.')
    .custom(uniqueFieldExceptOwner('curp', personRepository, 'personId',
      (body: any) => body.person.personId)).withMessage('El CURP ya está en uso.'),

  body('person.cellphone')
    .optional()
    .isLength({ min: 10 }).withMessage('El teléfono debe tener al menos 10 caracteres.'),

  body('person.birthdate')
    .optional()
];

export const loginSchema = [
  body('*').custom(isIpBanned).withMessage('La IP fue bloqueada'),
  body('email')
    .notEmpty().withMessage('El correo es requerido.')
    .isEmail().withMessage('El correo debe ser un correo válido.'),

  body('password')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
];