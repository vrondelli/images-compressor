import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
} from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { DownloadService } from './services/download.service';
import { FileCompressionService } from './services/file-compression.service';
import { Response } from 'express-serve-static-core';

interface DownloadImagesDto {
  readonly images: string[];
}

@Controller()
export class AppController {
  private readonly downloadImagesDtoSchema = Joi.object()
    .keys({
      images: Joi.array()
        .items(
          Joi.string()
            .uri()
            .required(),
        )
        .required(),
    })
    .required();

  constructor(
    private readonly downloadService: DownloadService,
    private readonly fileCompressionService: FileCompressionService,
  ) {}

  @Post('/download')
  public async getCompressedPhotos(
    @Body() downloadImagesDto: DownloadImagesDto,
  ) {
    const { error } = this.downloadImagesDtoSchema.validate(downloadImagesDto);

    if (error) {
      throw new BadRequestException(error.message);
    }

    const directoryPath = await this.downloadService.downloadImages(
      downloadImagesDto.images,
    );

    const zipPath = await this.fileCompressionService.compressDirectoryFiles(
      directoryPath,
    );

    return zipPath;
  }
}
