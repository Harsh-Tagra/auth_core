import { AbstractTokenCache } from "./abstract.token.cache";

export class EmailVerificationTokenCache extends AbstractTokenCache {
  protected prefix = "verify";
  private readonly TTL_SECONDS = 600; // 10 mint
  public createToken = async (
    identifier: string,
    token: string
  ): Promise<void> => {
    await this.setToken(identifier, token, this.TTL_SECONDS);
  };
}
