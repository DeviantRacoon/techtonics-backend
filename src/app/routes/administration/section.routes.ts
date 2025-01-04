import { Router } from "express";
import { validate } from "@middlewares/validator.middleware";

import { getSections, getOneSection, createSection, updateSection } from "@modules/menu/services/section.service";
import { createSectionSchema, updateSectionSchema } from "@modules/menu/validator/section.validator";

const router = Router();

router.get("/", getSections);
router.get("/unique", getOneSection);
router.post("/", validate(createSectionSchema), createSection);
router.put("/", validate(updateSectionSchema), updateSection);

export default router;