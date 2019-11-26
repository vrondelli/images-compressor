import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DownloadService } from './services/download.service';
import { FileCompressionService } from './services/file-compression.service';
import { IFileCompressor } from './interfaces';
import { FileCompressor } from './services/file-compressor.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    DownloadService,
    {
      provide: IFileCompressor,
      useClass: FileCompressor,
    },
    FileCompressionService,
  ],
})
export class AppModule {}
