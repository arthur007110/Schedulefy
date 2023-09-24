import { parsedDataItem } from '../interface';

// Função para formatar a grade em uma matriz de semana
function formatGradeToWeekMatrix(
  grade: parsedDataItem[],
  fimDeSemana: boolean = false
): parsedDataItem[][] {
  const quantidadeDeDias = fimDeSemana ? 7 : 5;
  const weekMatrix: parsedDataItem[][] = Array(quantidadeDeDias).fill([]);

  for (const curso of grade) {
    const diaDoCurso = fimDeSemana ? curso.diaDaSemana : curso.diaDaSemana - 1;
    if (!Array.isArray(weekMatrix[diaDoCurso])) {
      weekMatrix[diaDoCurso] = [];
    }
    const dayArray = weekMatrix[diaDoCurso];
    if (dayArray) {
      const arrayCopy = [...dayArray];
      arrayCopy.push(curso);
      weekMatrix[diaDoCurso] = arrayCopy;
    }
  }

  const orderedMatrix = weekMatrix.map((day) => {
    return day.sort((a, b) => {
      if (a.horario.inicio.hora < b.horario.inicio.hora) return -1;
      if (a.horario.inicio.hora > b.horario.inicio.hora) return 1;
      if (a.horario.inicio.minuto < b.horario.inicio.minuto) return -1;
      if (a.horario.inicio.minuto > b.horario.inicio.minuto) return 1;
      return 0;
    });
  });

  // Garantir que a matriz tenha a mesma quantidade de itens em cada dia
  const maxDayLength = Math.max(...orderedMatrix.map((day) => day.length));
  const formattedMatrix = orderedMatrix.map((day) => {
    if (day.length < maxDayLength) {
      const dayCopy = [...day];
      for (let i = day.length; i < maxDayLength; i++) {
        dayCopy.push({
          curso: '',
          horario: {
            inicio: { hora: 0, minuto: 0 },
            fim: { hora: 0, minuto: 0 },
          },
          professor: '',
          diaDaSemana: 0,
          optativa: false,
          obrigatorio: false,
        });
      }
      return dayCopy;
    }
    return day;
  });

  return formattedMatrix;
}

export { formatGradeToWeekMatrix };
