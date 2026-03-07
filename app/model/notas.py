from sqlalchemy import Column, String, Float, ForeignKey, Enum, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from datetime import datetime
from model.base import Base
from model.aluno import Aluno
from model.disciplina import Disciplina

class Nota(Base):

    __tablename__ = "notas"

    codigo = Column(Integer, primary_key=True)
    n1 = Column(Numeric(4,2))
    n2 = Column(Numeric(4,2))
    
    matricula_aluno = Column(UUID, ForeignKey("aluno.matricula"), nullable=False)
    alunos = relationship("Aluno", back_populates="notas")

    cod_materia = Column(Integer, ForeignKey("disciplina.codigo"), nullable=False)
    disciplinas = relationship("Disciplina", back_populates="notas")


    def media(self):
        return (self.n1+self.n2)/2