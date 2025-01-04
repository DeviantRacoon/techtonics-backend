import { body } from "express-validator";
import sectionRepository from "../repositories/section.repository";

const exist = async (sectionId: number) => {
  const isValid = await sectionRepository.getByParams({ sectionId });
  if (!isValid) return false;
};

export const createSectionSchema = [
  body('sectionName')
    .notEmpty().withMessage('El nombre es requerido.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
  body('url')
    .notEmpty().withMessage('La url es requerida.')
    .isLength({ min: 10 }).withMessage('La url debe tener al menos 10 caracteres.'),
  body('menuId')
    .notEmpty().withMessage('El menú es requerido.')
    .isNumeric().withMessage('El menú debe ser un número.')

];

export const updateSectionSchema = [
  body('sectionId')
    .custom(exist).withMessage('La section no existe.')
    .notEmpty().withMessage('El id es requerido.')
    .isNumeric().withMessage('El id debe ser un número.')
];
