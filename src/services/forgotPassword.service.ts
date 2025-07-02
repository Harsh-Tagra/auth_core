import { ForgotPasswordTokenCache } from "../cache/forgotPassword.cache";
import { AuthRepository } from "../repositories/auth.repository";
import { Hasher } from "../utils/hash.util";

export class ForgotPasswordService {
  private readonly Hasher: Hasher;
  private readonly AuthRepo: AuthRepository;
  private readonly cache: ForgotPasswordTokenCache;
  constructor(AuthRepo?: AuthRepository, cache?: ForgotPasswordTokenCache) {
    this.Hasher = new Hasher();
    this.AuthRepo = AuthRepo ?? new AuthRepository();
    this.cache = cache ?? new ForgotPasswordTokenCache();
  }
  requestPasswordReset = async (email: string) => {
    const token = await this.Hasher.generateToken();
    const userData: any = await this.AuthRepo.findByEmail(email);

    if (!userData) {
      return {
        error: "no User account found on this email",
        status: 400,
      };
    }
    if (!userData?.emails[0].isVerified) {
      return {
        error: "User already exists but not verified",
        status: 409,
      };
    }
    if (!userData?.emails[0].isPrimary) {
      return {
        error: "User already exists but this not primary Email",
        status: 409,
      };
    }

    await this.cache.createToken(userData.id, token);

    return {
      success: true,
      message: "Token generated",
    };
    // add email logic here in future
  };
}
