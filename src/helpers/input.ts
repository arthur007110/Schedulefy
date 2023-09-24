import xlsx from 'xlsx';
import * as fs from 'fs';
import { InputDataItem } from '../interface';

const INPUT_FILE_PATH = 'src/input/input_file.csv';

function readInputCLS() {
  // Ler o arquivo como um buffer de bytes
  const fileBuffer = fs.readFileSync(INPUT_FILE_PATH);

  // Converter o buffer em uma string UTF-8
  const fileData = fileBuffer.toString('utf-8');

  // Analisar a string como uma planilha CSV usando a biblioteca xlsx
  const workbook = xlsx.read(fileData, { type: 'string' });
  const sheetName = workbook.SheetNames[0] as string;
  const sheet = workbook.Sheets[sheetName] as xlsx.WorkSheet;

  // Converter a planilha em uma matriz de objetos JavaScript
  const data = xlsx.utils.sheet_to_json(sheet);

  return data as InputDataItem[];
}

export { readInputCLS };
