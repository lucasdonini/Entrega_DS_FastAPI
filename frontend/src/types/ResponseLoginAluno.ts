import type Aluno from "./Aluno";
import type Nota from "./Nota";
import type Observacao from "./Observacao";

export default interface ResponseLoginAluno {
  aluno: Aluno,
  notas: Nota[],
  observacoes_aluno: Observacao[]
}