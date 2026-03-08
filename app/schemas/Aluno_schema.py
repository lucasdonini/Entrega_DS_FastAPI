from pydantic import BaseModel
from uuid import UUID

class AlunoResponse:
    matricula:UUID
    nome:str
    usuario:str
    email:str
    senha:str