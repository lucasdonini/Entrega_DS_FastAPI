from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from datetime import datetime
from model.base import Base
from model.aluno import Aluno
from model.professor import Professor

class Observacoes(Base):

    __tablename__ = "observacoes"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )   
    mensagem = Column(Text, nullable=False)  
    data_envio = Column(DateTime, nullable=False, default=datetime.utcnow)


    id_destinatario = Column(UUID, ForeignKey("aluno.matricula"), nullable=False)
    alunos = relationship("Aluno", back_populates="observacoes")

    id_remetente = Column(UUID, ForeignKey("professor.id"), nullable=False)
    professores = relationship("Professor", back_populates="observacoes")