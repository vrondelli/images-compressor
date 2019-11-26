import { Injectable } from '@nestjs/common';
import uuid = require('uuid/v4');
import requestPromise = require('request-promise-native');
import * as fs from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

@Injectable()
export class DownloadService {
  public async downloadImages(imagesUrls: string[]): Promise<string> {
    const directoryName = uuid();
    const directoryPath = join(tmpdir(), `images_uploader/${directoryName}`);

    await fs.promises.mkdir(directoryPath, { recursive: true });

    const promises = this.getRequestPromises(imagesUrls, directoryPath);

    return Promise.all(promises)
      .then(() => directoryPath)
      .catch(error => {
        throw new Error(error);
      });
  }

  private getRequestPromises(imagesUrls: string[], directoryPath: string) {
    return imagesUrls.map(async (url, index) => {
      return new Promise<string>((resolve, reject) => {
        const fileName = `photo_${index}.png`;

        return requestPromise(url, {
          headers: {
            'Content-Type': 'image/png',
          },
        })
          .pipe(
            fs.createWriteStream(join(directoryPath, fileName), {
              encoding: 'binary',
            }),
          )
          .on('close', () => resolve(fileName))
          .on('error', error => reject(error));
      });
    });
  }
}
