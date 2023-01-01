export abstract class ILogger {
  abstract debug(context: string): void;
  abstract log(context: string): void;
  abstract error(context: string, trace?: string): void;
  abstract warn(context: string): void;
}
