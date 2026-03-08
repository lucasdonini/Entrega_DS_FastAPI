from model.notas import Nota
from model.professor import Professor
from model.disciplina import Disciplina
from model.professor_disciplina import professor_disciplina
from sqlalchemy import func
from uuid import UUID
from sqlalchemy.orm import Session


class ProfessorRepository:

    def __init__(self, db: Session):
        self.db = db

    def buscar_por_usuario(self, usuario: str):
        professor = self.db.query(Professor).filter(
            Professor.usuario == usuario
        ).first()
        return professor

    def contar_notas(self, usuario: str):
        professor = self.buscar_por_usuario(usuario)

        if not professor:
            raise ValueError("Professor não encontrado")

        total = (
            self.db.query(func.count(Nota.id_aluno)).
            join(Disciplina, Disciplina.codigo == Nota.id_disciplina).
            join(professor_disciplina, professor_disciplina.c.id_disciplina == Disciplina.codigo).
            filter(professor_disciplina.c.id_professor == professor.id).
            scalar()
        )
        return total or 0

    def calc_media_geral(self, usuario: str):
        professor = self.buscar_por_usuario(usuario)

        if not professor:
            raise ValueError("Professor não encontrado")

        media_geral = (self.db.query(func.avg((Nota.n1+Nota.n2)/2.0)).
                       join(Disciplina, Disciplina.codigo == Nota.id_disciplina).
                       join(professor_disciplina, professor_disciplina.c.id_disciplina == Disciplina.codigo).
                       filter(professor_disciplina.c.id_professor == professor.id).
                       scalar())

        
        return media_geral or 0
    

    def materias_lecionadas(self, usuario:str):
        professor = self.buscar_por_usuario(usuario)

        if not professor:
            raise ValueError("Professor não encontrado")
        
        return (self.db.query(Disciplina)
                .join(professor_disciplina, professor_disciplina.c.disciplina_id == Disciplina.codigo)
                .filter(professor_disciplina.c.professor_id == professor.id)
                .all()
                )
    
    def buscar_por_id(self, id:UUID):
        return self.db.get(Professor, id)
