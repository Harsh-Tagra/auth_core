import { PlanType } from "@prisma/client";
import { AuthRepository } from "../../../src/repositories/auth.repository";
import { mockPrisma } from "../../../tests/mocks/prisma.mock";
describe(" Auth Repository", () => {
  const AuthRepo = new AuthRepository(mockPrisma);
  const email = "test@example.com";

  const mockUser = {
    email: "test@example.com",
    name: "test",
    password: "hashedpwd",
  };
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

  it("should return null if email does not exist", async () => {
    (mockPrisma.email.findUnique as jest.Mock).mockResolvedValue(null);
    const user = await AuthRepo.findByEmail(email);
    expect(user).toBeNull();
  });

  it("should return email with user if found by email ", async () => {
    (mockPrisma.email.findUnique as jest.Mock).mockResolvedValue(mockUserData);
    const user = await AuthRepo.findByEmail(email);
    expect(user).not.toBeNull();
    expect(user).toBe(mockUserData);
  });

  it("should create a user with provided data &&  return the created user object on success  ", async () => {
    jest.spyOn(mockPrisma.user, "create").mockResolvedValue(mockUserData);

    const user = await AuthRepo.createUser(
      mockUser.email,
      mockUser.name,
      mockUser.password
    );
    expect(user).not.toBeNull();
    expect(user).toBe(mockUserData);
  });
  it("should throw an error if prisma.user.create throws", async () => {
    const errorMessage = "Database error";

    jest
      .spyOn(mockPrisma.user, "create")
      .mockRejectedValue(new Error(errorMessage));

    await expect(
      AuthRepo.createUser(mockUser.email, mockUser.name, mockUser.password)
    ).rejects.toThrow(errorMessage);
  });

  it("should throw an error if prisma.email.findUnique throws", async () => {
    const errorMessage = "DB exploded";

    (mockPrisma.email.findUnique as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await expect(AuthRepo.findByEmail("user@GMAI.COM")).rejects.toThrow(
      errorMessage
    );
  });
  it("should return null if email is empty string", async () => {
    (mockPrisma.email.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await AuthRepo.findByEmail("");
    expect(result).toBe(null);
  });
});
