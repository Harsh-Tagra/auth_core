import { PlanType } from "@prisma/client";
import { SettingsRepository } from "../../../src/repositories/settings.repository";
import { mockPrisma } from "../../mocks/prisma.mock";

describe("Settings Repository", () => {
  const mockUserData = {
    id: "user1",
    name: "Harsh",
    password: "secret",
    profileImage: "img.png",
    plan: PlanType.FREE, //  // assuming this is your enum value
    createdAt: new Date(),
    updatedAt: new Date(),
    emails: [
      {
        id: "email1",
        email: "harsh@example.com",
        isPrimary: true,
        isVerified: false,
        userId: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  const SettingsRepo = new SettingsRepository(mockPrisma as any);
  it("should return null if user does not exist", async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await SettingsRepo.findUserById("22823bdcuihh");
    expect(result).toBe(null);
  });
  it("should return email with user if found by id ", async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserData);
    const user = await SettingsRepo.findUserById("user1");
    expect(user).not.toBeNull();
    expect(user).toBe(mockUserData);
  });

  it("should update password in user  ", async () => {
    jest.spyOn(mockPrisma.user, "update").mockResolvedValue(mockUserData);
    const result = await SettingsRepo.updatePassword("user1", "lol@3554");

    expect(result).toBe(mockUserData);
  });
  it("should throw an error if prisma.user.update throws", async () => {
    const errorMessage = "Database error";

    jest
      .spyOn(mockPrisma.user, "update")
      .mockRejectedValue(new Error(errorMessage));

    await expect(
      SettingsRepo.updatePassword("user1", "newPass123")
    ).rejects.toThrow(errorMessage);
  });
  it("should throw an error if prisma.user.findUnique throws", async () => {
    const errorMessage = "DB exploded";

    (mockPrisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await expect(SettingsRepo.findUserById("user1")).rejects.toThrow(
      errorMessage
    );
  });
  it("should return null if userId is empty string", async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await SettingsRepo.findUserById("");
    expect(result).toBe(null);
  });
});
