from model.aluno import Aluno
from model.notas import Nota
from model.disciplina import Disciplina
from model.professor_disciplina import professor_disciplina
from repositories.professor_repository import ProfessorRepository
from uuid import UUID

class AlunoRepository:

    def __init__(self, db):
        self.db = db


    def list(self):
        return self.db.query(Aluno).all()
    
    def buscar_por_email(self, email:str):
        return (self.db.query(Aluno).filter(Aluno.email == email).first())
    
    def buscar_por_matricula(self, matricula:UUID):
        return self.db.get(Aluno, matricula)

    def pre_cadastro(self, nome:str, matricula:UUID, usuario:str):

        aluno = Aluno(
            matricula=matricula,
            nome=nome,
            usuario=usuario
        )

        self.db.add(aluno)
        self.db.commit()

    def completar_cadatro(self, matricula:UUID, email:str, senha:str):

        aluno = Aluno(
            self.db.query(Aluno).
            filter(Aluno.matricula == matricula).
            first()
        )

        if aluno:
            aluno.email = email
            aluno.senha = senha

        else:
            return "Aluno não encontrado"
        
        self.db.commit()
        return aluno
    

    def buscar_alunos_por_professor(self, usuario_professor:str):
        professor = ProfessorRepository.buscar_por_usuario(usuario_professor)

        if not professor:
            raise ValueError("Professor não encontrado")

        alunos = (
            self.db.query(Aluno).
            join(Nota, Nota.matricula_aluno == Aluno.matricula).
            join(Disciplina, Disciplina.codigo == Nota.cod_materia).
            join(professor_disciplina, professor_disciplina.disciplina_id == Disciplina.codigo).
            filter(professor_disciplina.professor_id == professor.id).
            distinct().
            all()
        )
        return alunos


