import Joi from "joi";

export class SettingsValidation {
  static changePassword = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
  });
}
