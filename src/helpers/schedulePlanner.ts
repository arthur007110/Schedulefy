import { Horario, parsedDataItem } from '../interface';

class CursoNode {
  constructor(
    public curso: parsedDataItem,
    public neighbors: CursoNode[] = []
  ) {}
}

class Graph {
  nodes: CursoNode[] = [];

  addNode(curso: parsedDataItem): CursoNode {
    const node = new CursoNode(curso);
    this.nodes.push(node);
    return node;
  }
}

// Função para verificar se dois horários têm conflito
function hasConflict(horario1: Horario, horario2: Horario): boolean {
  const start1 = new Date(
    0,
    0,
    0,
    horario1.inicio.hora,
    horario1.inicio.minuto
  );
  const end1 = new Date(0, 0, 0, horario1.fim.hora, horario1.fim.minuto);
  const start2 = new Date(
    0,
    0,
    0,
    horario2.inicio.hora,
    horario2.inicio.minuto
  );
  const end2 = new Date(0, 0, 0, horario2.fim.hora, horario2.fim.minuto);

  return (
    (start1 <= start2 && start2 < end1) || (start2 <= start1 && start1 < end2)
  );
}

// Função para construir o grafo dos cursos e suas restrições
function buildCourseGraph(cursos: parsedDataItem[]): Graph {
  const graph = new Graph();

  for (const curso of cursos) {
    const node = graph.addNode(curso);

    for (const neighborNode of graph.nodes) {
      if (node === neighborNode) continue; // Ignorar o próprio nó (curso)
      if (
        curso.diaDaSemana === neighborNode.curso.diaDaSemana &&
        hasConflict(curso.horario, neighborNode.curso.horario)
      ) {
        node.neighbors.push(neighborNode);
        neighborNode.neighbors.push(node);
      }
    }
  }

  return graph;
}

// Função para atribuir horários aos cursos usando coloração de grafos
function assignTimings(
  graph: Graph,
  limiteCombinações: number,
  minimoDeCursosPorGrade: number,
  maximoDeCursosPorGrade: number
): parsedDataItem[][] {
  const courses = graph.nodes.map((node) => node.curso);
  const validGrades: parsedDataItem[][] = [];

  // Função para verificar se um nó está em conflito com qualquer nó na grade
  function hasConflictWithGrade(
    node: CursoNode,
    grade: parsedDataItem[]
  ): boolean {
    return grade.some((curso) =>
      node.neighbors.some(
        (neighborNode) => neighborNode.curso.curso === curso.curso
      )
    );
  }

  function isDuplicateGrade(
    grade: parsedDataItem[],
    validGrades: parsedDataItem[][]
  ): boolean {
    return validGrades.some((validGrade) => {
      return grade.every((curso) => validGrade.includes(curso));
    });
  }

  // Função para criar todas as combinações de cursos sem conflito
  function generateCombinations(
    currentGrade: parsedDataItem[],
    remainingCourses: parsedDataItem[],
    cursosPorGrade: number = 10
  ) {
    if (validGrades.length >= limiteCombinações) {
      return; // Parar a geração de combinações após atingir o limite
    }

    if (currentGrade.length >= cursosPorGrade) {
      if (!isDuplicateGrade(currentGrade, validGrades)) {
        validGrades.push(currentGrade);
      }
      return;
    }

    for (let i = 0; i < remainingCourses.length; i++) {
      const course = remainingCourses[i];
      if (!course) continue;

      const relatedCourses = remainingCourses.filter(
        (c) => c.curso === course.curso
      );

      const relatedCoursesNodes = graph.nodes.filter(
        (node) => node.curso.curso === course.curso
      );
      const hasConflictWithRelated = relatedCoursesNodes.some((node) => {
        return hasConflictWithGrade(node, currentGrade);
      });

      if (!hasConflictWithRelated) {
        const nextGrade = [...currentGrade, ...relatedCourses];
        const remainingCoursesWithoutRelated = remainingCourses.filter(
          (c) => !relatedCourses.includes(c)
        );
        generateCombinations(nextGrade, remainingCoursesWithoutRelated);
      }
    }
  }

  for (let i = maximoDeCursosPorGrade; i >= minimoDeCursosPorGrade; i--) {
    generateCombinations([], courses, i);
  }

  return validGrades;
}

// Função principal
function gerarTodasAsGrades(
  cursos: parsedDataItem[],
  limiteCombinações: number = 100,
  minimoDeCursosPorGrade: number = 10,
  maximoDeCursosPorGrade: number = 10
  // cursosObrigatorios: string[]
): parsedDataItem[][] {
  const courseGraph = buildCourseGraph(cursos);
  return assignTimings(
    courseGraph,
    limiteCombinações,
    minimoDeCursosPorGrade,
    maximoDeCursosPorGrade
  );
}

export { gerarTodasAsGrades };
