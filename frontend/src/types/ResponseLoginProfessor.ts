import type Professor from "./Professor";
import type Aluno from "./Aluno";
import type Disciplina from "./Disciplina";

export default interface ResponseProfessor {
  professor: Professor;
  qnt_notas: number;
  media_alunos: number;
  alunos: Aluno[];
  materias: Disciplina[];
}
