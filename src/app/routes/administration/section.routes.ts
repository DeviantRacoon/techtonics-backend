import { Router } from "express";
import { validate } from "@middlewares/validator.middleware";

import { getSections, getOneSection, createSection, updateSection } from "@modules/menu/services/section.service";
import { createSectionSchema, updateSectionSchema } from "@modules/menu/validator/section.validator";

const sectionRouter = Router();

sectionRouter.get("/", getSections);
sectionRouter.get("/unique", getOneSection);
sectionRouter.post("/", validate(createSectionSchema), createSection);
sectionRouter.put("/", validate(updateSectionSchema), updateSection);

export default sectionRouter;