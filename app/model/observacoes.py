from sqlalchemy import Column, DateTime, Text, ForeignKey, Identity
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from datetime import datetime
from model.base import Base


class Observacoes(Base):

    __tablename__ = "observacoes"

    id = Column(
        UUID(as_uuid=True),
        Identity(True),
        primary_key=True,
        default=uuid.uuid4
    )   
    mensagem = Column(Text, nullable=False)  
    data_envio = Column(DateTime, nullable=False, default=datetime.utcnow)


    id_destinatario = Column(UUID, ForeignKey("aluno.matricula"), nullable=False)
    alunos = relationship("Aluno", back_populates="observacoes")

    id_remetente = Column(UUID, ForeignKey("professor.id"), nullable=False)
    professores = relationship("Professor", back_populates="observacoes")

    def to_dict(self):
        return {
            "id": str(self.id),
            "mensagem": self.mensagem,
            "data_envio": str(self.data_envio),
            "id_remetente": str(self.id_remetente),
            "id_destinatario": str(self.id_destinatario)
        }