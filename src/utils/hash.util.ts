import bcrypt from "bcrypt";
import crypto from "crypto";
import { promisify } from "util";

export class Hasher {
  private bcrypt;
  private crypto;
  private saltRounds: number;
  constructor() {
    this.bcrypt = bcrypt;
    this.saltRounds = 12;
    this.crypto = crypto;
  }

  public Password = async (password: string): Promise<string> => {
    try {
      return await this.bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      console.error("❌ Error while hashing password:", error);
      throw new Error("Failed to hash password");
    }
  };

  public comparePassword = async (
    password: string,
    hash: string
  ): Promise<boolean> => {
    try {
      return await this.bcrypt.compare(password, hash);
    } catch (error) {
      console.error("❌ Error while comparing password:", error);
      throw new Error("Failed to compare password");
    }
  };

  public generateToken = async () => {
    const asyncRandomBytes = promisify(this.crypto.randomBytes);

    try {
      const buffer = await asyncRandomBytes(32);
      return buffer.toString("hex");
    } catch (error) {
      console.error("❌ Error while generating Token:", error);
      throw new Error("Failed to generate Token");
    }
  };
}
