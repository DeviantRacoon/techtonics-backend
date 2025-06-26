import { body } from 'express-validator';
import productRepository from '../../infrastructure/repositories/product.repository';

const existProduct = async (productId: number) => {
  const product = await productRepository.getOneProductByParams({ productId });
  if (!product) {
    throw new Error('El producto no existe.');
  }
};

export const createProductSchema = [
  body('productName')
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser una cadena de texto.'),
  body('type')
    .notEmpty().withMessage('El tipo es requerido.')
    .isIn(['ALMACEN', 'SERVICIO']).withMessage('Tipo no válido.'),
];

export const updateProductSchema = [
  body('productId')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
    .custom(existProduct).withMessage('El producto no existe.')
];
