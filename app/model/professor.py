from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from datetime import datetime
from model.base import Base
from model.observacoes import Observacoes
from model.professor_disciplina import professor_disciplina
from model.disciplina import Disciplina

class Professor(Base):

    __tablename__ = "professor"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    
    nome = Column(String(100), nullable=False)
    usuario = Column(String(100), nullable=False)
    senha = Column(String(100), nullable=False)

    observacoes = relationship("Observacoes", back_populates="professores")
    disciplinas = relationship("Disciplina",secondary=professor_disciplina, back_populates="professores")