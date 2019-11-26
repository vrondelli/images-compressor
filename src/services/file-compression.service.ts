import { IFileCompressionService, IFileCompressor } from '../interfaces';
import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileCompressionService implements IFileCompressionService {
  constructor(
    @Inject(IFileCompressor) private readonly fileCompressor: IFileCompressor,
  ) {}

  public async compressDirectoryFiles(
    filesDirectoryPath: string,
  ): Promise<string> {
    const allDirectoryFiles = await fs.promises.readdir(filesDirectoryPath);
    const allFilesPath = allDirectoryFiles.map(file =>
      join(filesDirectoryPath, file),
    );

    const splittedDirectoryPath = filesDirectoryPath.split('/');
    const zipFileName = splittedDirectoryPath[splittedDirectoryPath.length - 1];

    return this.fileCompressor.compressFiles(allFilesPath, zipFileName);
  }
}
