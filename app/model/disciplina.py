from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from enum import Enum
import uuid

from datetime import datetime
from model.base import Base
from model.notas import Nota
from model.professor_disciplina import professor_disciplina
from model.professor import Professor


class Disciplina(Base):

    __tablename__ = "disciplina"

    codigo = Column(Integer, primary_key=True)
    nome = Column(String, name=False)

    notas = relationship("Nota", back_populates="disciplinas")
    professores = relationship("Professor",secondary=professor_disciplina, back_populates="disciplinas")