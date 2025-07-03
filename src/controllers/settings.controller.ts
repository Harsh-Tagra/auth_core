import { Request, Response } from "express";
import { SettingsService } from "../services/settings.service";
import { AuthenticatedRequest } from "../interfaces/authenticated-request.interface";

export class SettingsController {
  private readonly settingsService: SettingsService;
  constructor() {
    this.settingsService = new SettingsService();
  }

  public changePassword = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const { oldPassword, newPassword } = req.body;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const result = await this.settingsService.changePassword(
        userId,
        oldPassword,
        newPassword
      );
      if (!result) {
        res.status(400).json({ message: "User registration failed" });
        return;
      }
      if ("error" in result) {
        res.status(result.status).json({ message: result.error });
        return;
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("internal server error");
    }
  };
}
