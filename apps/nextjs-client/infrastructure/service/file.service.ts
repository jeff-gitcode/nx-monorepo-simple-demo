import { injectable } from 'inversify';

import * as fs from 'fs';

export abstract class IFileStreamService {
  abstract writeFileSync(writePath: string, contents: string): void;
  abstract readFileSync(origFilePath: string): string;
  abstract existsSync(projectPath: string): any;
}

@injectable()
export class FileStreamService {
  writeFileSync(writePath: string, contents: string) {
    try {
      return fs.writeFileSync(writePath, contents, 'utf-8');
    } catch (error) {
      console.log(
        '🚀 ~ file: file.service.ts:17 ~ FileStreamService ~ writeFileSync ~ error',
        error
      );
    }
  }

  readFileSync(origFilePath: string): string {
    return fs.readFileSync(origFilePath, 'utf-8');
  }
  existsSync(projectPath: string) {
    return fs.existsSync(projectPath);
  }
}
