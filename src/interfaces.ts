export interface IFileCompressionService {
  compressDirectoryFiles(filesDirectoryPath: string): Promise<string>;
}

export const IFileCompressor = Symbol('IFileCompressor');
export interface IFileCompressor {
  compressFiles(filesPath: string[], zipFileName: string): string;
}
