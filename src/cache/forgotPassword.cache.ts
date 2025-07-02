import { AbstractTokenCache } from "./abstract.token.cache";

export class ForgotPasswordTokenCache extends AbstractTokenCache {
  protected prefix = "forgot";
  private readonly TTL_SECONDS = 900; // 15 mint
  public createToken = async (
    identifier: string,
    token: string
  ): Promise<void> => {
    await this.setToken(identifier, token, this.TTL_SECONDS);
  };
}
