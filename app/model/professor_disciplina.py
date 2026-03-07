from sqlalchemy import Table, Column, String, DateTime, Text, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from datetime import datetime
from model.base import Base
from model.disciplina import Disciplina
from model.professor import Professor

professor_disciplina = Table(
"professor_disciplina",
Base.metadata,
Column("professor_id", UUID, ForeignKey("professor.id"), primary_key=True),
Column("disciplina_id", Integer, ForeignKey("disciplina.codigo"), primary_key=True)
)