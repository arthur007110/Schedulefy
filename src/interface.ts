export interface InputDataItem {
  Curso: string;
  Professor: string;
  'Dia da semana': string;
  Horário: string;
  Optativa: boolean;
  'Deve estar presente na grade final': boolean;
}

export interface Horario {
  inicio: {
    hora: number;
    minuto: number;
  };
  fim: {
    hora: number;
    minuto: number;
  };
}

export interface parsedDataItem {
  curso: string;
  professor: string;
  diaDaSemana: number;
  horario: Horario;
  optativa: boolean;
  obrigatorio: boolean;
}
