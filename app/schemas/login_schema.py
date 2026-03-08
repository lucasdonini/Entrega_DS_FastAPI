from pydantic import BaseModel


class CredenciaisLogin(BaseModel):
    usuario: str
    senha: str
