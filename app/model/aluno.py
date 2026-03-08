from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from model.base import Base



class Aluno(Base):

    __tablename__ = "aluno"

    matricula = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    nome = Column(String(100), nullable=False)
    senha = Column(String(100), nullable=True)
    usuario = Column(String(50), nullable=False)

    notas = relationship("Nota", back_populates="alunos")
    observacoes = relationship("Observacoes", back_populates="alunos")


    def to_dict(self):
        return {
            "matricula": str(self.matricula),
            "nome": self.nome,
            "usuario": self.usuario,
        }

