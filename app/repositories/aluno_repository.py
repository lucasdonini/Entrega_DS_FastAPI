from model.aluno import Aluno
from model.notas import Nota
from model.disciplina import Disciplina
from model.professor_disciplina import professor_disciplina
from repositories.professor_repository import ProfessorRepository
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import and_, select


class AlunoRepository:

    def __init__(self, db: Session):
        self.db = db

    def list(self):
        return self.db.query(Aluno).all()

    def buscar_por_usuario(self, usuario: str):
        return (self.db.query(Aluno).filter(Aluno.email == usuario).first())

    def buscar_por_matricula(self, matricula: UUID):
        return self.db.get(Aluno, matricula)

    def pre_cadastro(self, nome: str, matricula: UUID, usuario: str):

        aluno = Aluno(
            matricula=matricula,
            nome=nome,
            usuario=usuario
        )

        self.db.add(aluno)
        self.db.commit()

        return aluno

    def completar_cadatro(self, matricula: UUID, email: str, senha: str):

        aluno = (
            self.db.query(Aluno).
            filter(Aluno.matricula == matricula).
            first()
        )

        if not aluno:
            return "Aluno não encontrado"

        aluno.email = email
        aluno.senha = senha

        self.db.commit()
        return aluno

    def buscar_alunos_por_professor(self, usuario_professor: str):
        professor_repository = ProfessorRepository(self.db)

        professor = professor_repository.buscar_por_usuario(usuario_professor)

        if not professor:
            raise ValueError("Professor não encontrado")

        alunos = (
            self.db.query(Aluno)
                .outerjoin(Nota, Nota.id_aluno == Aluno.matricula)
                .outerjoin(Disciplina, and_(
                    Disciplina.codigo == Nota.id_disciplina,
                    Disciplina.codigo.in_(
                        select(professor_disciplina.c.id_disciplina)
                        .where(professor_disciplina.c.id_professor == professor.id)
                    )
                ))
                .outerjoin(professor_disciplina, professor_disciplina.c.id_disciplina == Disciplina.codigo)
                .distinct()
                .all()
        )
        return alunos
