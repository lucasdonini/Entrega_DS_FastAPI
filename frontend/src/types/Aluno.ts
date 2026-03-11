import type Nota from "./Nota"

export default interface Aluno {
  matricula: string,
  nome: string,
  usuario: string,
  notas?: Nota[]
}