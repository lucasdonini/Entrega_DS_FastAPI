from pydantic import BaseModel

class CredenciaisCadastro(BaseModel):
    usuario: str
    senha: str