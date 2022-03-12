import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file), // old path
      resolve(`${upload.tmpFolder}/${folder}`, file) // new path
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filePath = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    fs.promises.unlink(filePath);
  }
}
