from model.observacoes import Observacoes
from repositories.aluno_repository import AlunoRepository
from repositories.professor_repository import ProfessorRepository
from uuid import UUID
from sqlalchemy.orm import Session


class ObservacoesRepository:

    def __init__(self, db: Session):
        self.db = db


    def list(self):
        return self.db.query(Observacoes).all()



    
    def carregar_obervacoes(self, email:str):
        aluno_repository = AlunoRepository(self.db)


        aluno = aluno_repository.buscar_por_email(email)

        if not aluno:
            raise ValueError("Aluno não encontrado")

        return (self.db.query(Observacoes)
                .filter(Observacoes.id_destinatario == aluno.matricula)
                .all()
                )


    
    def registrar_observacao(self, observacao:Observacoes):
        self.db.add(observacao)

        self.db.commit()

        return observacao




    def buscar_por_remetente(self, id_remetente:UUID):

        observacoes = self.db.query(Observacoes).filter(
            Observacoes.id_remetente == id_remetente
        ).all()
        return observacoes
    



    def apagar_observacao(self, usuario_professor:str):
        professor_repository = ProfessorRepository(self.db)

        professor = professor_repository.buscar_por_usuario(usuario_professor)
        observacao = self.db.query(Observacoes).filter(
            Observacoes.id_remetente == professor.id
        ).first()

        if not observacao:
            raise ValueError("Não existe nenhuma observação")
    
        self.db.delete(observacao)
        self.db.commit()




