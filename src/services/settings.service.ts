import { User } from "@prisma/client";
import { SettingsRepository } from "../repositories/settings.repository";
import { Hasher } from "../utils/hash.util";

export class SettingsService {
  private readonly SettingsRepo: SettingsRepository;
  private readonly Hasher: Hasher;
  constructor(settingsRepo?: SettingsRepository) {
    this.SettingsRepo = settingsRepo ?? new SettingsRepository();
    this.Hasher = new Hasher();
  }

  public changePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      const user: User | null = await this.SettingsRepo.findUserById(userId);
      if (!user) {
        return { error: "user not found", status: 400 };
      }
      const isOldPasswordCorrect = await this.Hasher.comparePassword(
        oldPassword,
        user.password
      );
      if (!isOldPasswordCorrect) {
        return {
          error: "Old password is incorrect",
          status: 401,
        };
      }
      if (oldPassword === newPassword) {
        return {
          error: "You cannot use the same password as the new password",
          status: 409,
        };
      }

      const hashPassword = await this.Hasher.Password(newPassword);
      const result = await this.SettingsRepo.updatePassword(
        userId,
        hashPassword
      );

      if (!result) {
        return { error: "failed to update password", status: 422 };
      }

      return { message: "Password changed successfully", status: 200 };
    } catch (error: any) {
      throw new Error(error.message || "Internal server error");
    }
  };
}
