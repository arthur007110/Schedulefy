import { formatGradeToWeekMatrix } from './helpers/formatter';
import { readInputCLS } from './helpers/input';
import { gradeToTable, stringToFile } from './helpers/output';
import { parseInputToDataStructure } from './helpers/parser';
import { gerarTodasAsGrades } from './helpers/schedulePlanner';

const rawData = readInputCLS();
const parsedData = parseInputToDataStructure(rawData);
const cursos = parsedData.filter((curso) => !curso.obrigatorio);

const todasAsGradesValidas = gerarTodasAsGrades(cursos, 100, 6, 10);
const gradesFormatadasComoMatriz = todasAsGradesValidas.map((grade) => {
  return formatGradeToWeekMatrix(grade);
});
const gradesFormatadasComoTabela = gradesFormatadasComoMatriz.map((grade) => {
  return gradeToTable(grade);
});

stringToFile(gradesFormatadasComoTabela.join('\n\n'));

console.log(gradesFormatadasComoTabela.join('\n\n'));
