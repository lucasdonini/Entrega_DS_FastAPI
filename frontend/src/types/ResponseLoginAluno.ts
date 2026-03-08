import type Aluno from "./Aluno";

export default interface ResponseLoginAluno {
  aluno: Aluno,
  notas: any[], // TODO: fazer o objeto Nota
  observacoes_aluno: any[] // TODO: fazer o objeto Observacao
}