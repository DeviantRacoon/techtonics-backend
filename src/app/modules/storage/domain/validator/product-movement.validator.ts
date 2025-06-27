import { body } from 'express-validator';
import productMovementRepository from '../../infrastructure/repositories/product-movement.repository';

const existProductMovement = async (productMovementId: number) => {
  const productMovement = await productMovementRepository.getOneProductMovementByParams({ productMovementId });
  if (!productMovement) {
    throw new Error('El movimiento de producto no existe.');
  }
};

export const createProductMovementSchema = [
  body('productMovementType')
    .notEmpty().withMessage('El tipo de movimiento es requerido.')
    .isIn(['ENTRADA', 'SALIDA']).withMessage('Tipo de movimiento no válido.'),
  body('productId')
    .notEmpty().withMessage('El id del producto es requerido.')
    .isNumeric().withMessage('El id del producto debe ser un número.'),
  body('quantity')
    .notEmpty().withMessage('La cantidad es requerida.')
    .isNumeric().withMessage('La cantidad debe ser un número.'),
  body('userId')
    .notEmpty().withMessage('El id del usuario es requerido.')
    .isNumeric().withMessage('El id del usuario debe ser un número.'),
];

export const updateProductMovementSchema = [
  body('productMovementId')
    .notEmpty().withMessage('El id del movimiento de producto es requerido.')
    .isNumeric().withMessage('El id del movimiento de producto debe ser un número.')
    .custom(existProductMovement).withMessage('El movimiento de producto no existe.')
];

