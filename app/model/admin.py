from sqlalchemy import Column, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
import uuid

from datetime import datetime
from model.base import Base
from model.notas import Nota



class Admin(Base):

    __tablename__ = "admin"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    senha = Column(String(100))
    email = Column(String(150), unique=True)