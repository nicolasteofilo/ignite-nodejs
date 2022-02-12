/* eslint-disable no-useless-return */
import fs from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    // ver se existe o arquivo
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // se existir, deleta
  await fs.promises.unlink(filename);
};
