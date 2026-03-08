from sqlalchemy import Column, ForeignKey, Integer, Numeric, Identity
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from model.base import Base


class Nota(Base):

    __tablename__ = "notas"

    id = Column(Integer,Identity(True), primary_key=True)
    n1 = Column(Numeric(4, 2))
    n2 = Column(Numeric(4, 2))

    id_aluno = Column(UUID, ForeignKey("aluno.matricula"), nullable=False)
    alunos = relationship("Aluno", back_populates="notas")

    id_disciplina = Column(Integer, ForeignKey(
        "disciplina.codigo"), nullable=False)
    disciplinas = relationship("Disciplina", back_populates="notas")

    def to_dict(self):
        return {
            "codigo": self.id,
            "n1": self.n1,
            "n2": self.n2,
            "matricula_aluno": self.id_aluno,
            "cod_materia": self.id_disciplina,
        }
