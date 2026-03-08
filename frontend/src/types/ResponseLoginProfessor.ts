import type Professor from './Professor'
import type Aluno from './Aluno'

export default interface ProfessorLoginResponse {
  professor: Professor,
  qnt_notas: number,
  media_alunos: number,
  alunos: Aluno[]
}