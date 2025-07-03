import { Router } from "express";
import { validate } from "../middlewares/validate";
import { SettingsValidation } from "../validations/settings.validation";
import { SettingsController } from "../controllers/settings.controller";

const settingsRouter = Router();
const settingsController = new SettingsController();

settingsRouter.post(
  "/change-password",
  validate(SettingsValidation.changePassword),
  settingsController.changePassword
);

export default settingsRouter;
