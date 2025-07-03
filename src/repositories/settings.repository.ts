import { PrismaClient, User } from "@prisma/client";

export class SettingsRepository {
  private prisma;
  constructor(prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient(); // fallback to real if none provided
  }
  public findUserById = async (userId: string): Promise<User | null> => {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  };
  public updatePassword = async (userId: string, newHashedPassword: string) => {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newHashedPassword,
      },
    });
  };
}
