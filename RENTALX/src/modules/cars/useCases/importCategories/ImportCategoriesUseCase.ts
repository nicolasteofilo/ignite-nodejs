import csvParse from 'csv-parse';
import fs from 'fs';

class ImportCategoriesUseCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    //  o ipe pega o que está dentro do nosso  strem e joga para um lugar que determinarmos
    stream.pipe(parseFile);

    parseFile.on('data', async (line) => {
      await console.log(line);
    });
  }
}

export { ImportCategoriesUseCase };
