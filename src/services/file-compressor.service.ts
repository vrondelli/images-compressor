import AdmZip = require('adm-zip');
import { join } from 'path';
import { tmpdir } from 'os';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IFileCompressor } from '../interfaces';

@Injectable()
export class FileCompressor implements IFileCompressor {
  public compressFiles(filesPath: string[], zipFileName: string): string {
    const zipPath = join(tmpdir(), `images_uploader/${zipFileName}.zip`);

    const zip = new AdmZip();

    filesPath.forEach(filePath => zip.addLocalFile(filePath));

    zip.writeZip(zipPath, error => {
      if (error) {
        throw new InternalServerErrorException(error.message);
      }
    });

    return zipPath;
  }
}
