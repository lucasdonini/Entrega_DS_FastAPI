from pydantic import BaseModel
from uuid import UUID


class NotaCreate(BaseModel):
    n1: float
    n2: float
    matricula_aluno: UUID
    cod_materia: int
