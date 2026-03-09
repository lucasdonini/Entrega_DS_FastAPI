import type Professor from "./Professor";
import type Aluno from "./Aluno";
import type Disciplina from "./Disciplina";

export default interface ResponseLoginProfessor {
  professor: Professor;
  alunos: Aluno[];
  materias: Disciplina[];
}
