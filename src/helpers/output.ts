import { Horario, parsedDataItem } from '../interface';
import table from 'table';
import fs from 'fs';

function gradeToTable(grade: parsedDataItem[][]) {
  const gradeTransposed = grade[0]!.map((_, colIndex) =>
    grade.map((row) => row[colIndex])
  );

  const tableData = [
    ['Horário', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
  ];

  for (let i = 0; i < gradeTransposed.length; i++) {
    const row = [];
    const horario = formatHorario(gradeTransposed[i]![0]!.horario);
    row.push(horario);
    for (let j = 0; j < gradeTransposed[0]!.length; j++) {
      const curso = gradeTransposed[i]![j]!.curso;
      row.push(curso);
    }
    tableData.push(row);
  }

  return table.table(tableData);
}

function formatHorario(horario: Horario) {
  return `${horario.inicio.hora}:${horario.inicio.minuto} - ${horario.fim.hora}:${horario.fim.minuto}`;
}

function formatFileNameWithDate() {
  const now = new Date();
  const formattedDate = now.toLocaleString().replace(/[/\\:*?"<>|]/g, '-'); // Substitui caracteres inválidos
  return `src/output/schedule_${formattedDate}.txt`;
}

function stringToFile(string: string) {
  fs.writeFileSync(formatFileNameWithDate(), string);
}

export { gradeToTable, stringToFile };
