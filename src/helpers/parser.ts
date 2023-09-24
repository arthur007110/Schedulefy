/**
 * Módulo para converter dados de entrada
 */

import { Horario, InputDataItem, parsedDataItem } from '../interface';

function parseDiaDaSemana(diaDaSemana: string): number {
  const semanaMap = {
    Segunda: 1,
    Terça: 2,
    Quarta: 3,
    Quinta: 4,
    Sexta: 5,
  };

  return semanaMap[diaDaSemana as keyof typeof semanaMap];
}

function parseHorario(horario: string): Horario {
  const horarios: { [key: string]: Horario } = {
    'Primeira aula': {
      inicio: {
        hora: 18,
        minuto: 30,
      },
      fim: {
        hora: 20,
        minuto: 10,
      },
    },
    'Segunda aula': {
      inicio: {
        hora: 20,
        minuto: 10,
      },
      fim: {
        hora: 21,
        minuto: 50,
      },
    },
  };
  if (!horarios[horario as keyof typeof horarios])
    throw new Error('Horário inválido');

  return horarios[horario as keyof typeof horarios] as Horario;
}

function parseInputToDataStructure(
  inputData: InputDataItem[]
): parsedDataItem[] {
  const parsedData = inputData.map((item) => {
    const diaDaSemana = parseDiaDaSemana(item['Dia da semana']);
    const horario = parseHorario(item['Horário']);

    return {
      curso: item.Curso,
      professor: item.Professor,
      diaDaSemana,
      horario,
      optativa: item.Optativa,
      obrigatorio: item['Deve estar presente na grade final'],
    };
  });

  return parsedData;
}

export { parseInputToDataStructure };
