from core.database import engine
from model.base import Base

def init_db():
    Base.metadata.create_all(bind=engine)