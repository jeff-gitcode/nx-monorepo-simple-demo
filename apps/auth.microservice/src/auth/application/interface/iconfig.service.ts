export abstract class IConfigService {
  abstract getEnv(): string;

  abstract getSecret(): string;

  abstract getRefreshSecret(): string;
}
