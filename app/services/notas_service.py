from repositories.notas_repository import NotasRepository
from repositories.aluno_repository import AlunoRepository
from repositories.professor_repository import ProfessorRepository
from model.notas import Nota
from uuid import UUID

class NotasService:

    def __init__(self, notas_repository:NotasRepository):
        self.notas_repository = notas_repository

    def listar_notas(self):
        try:
            notas = self.notas_repository.list()
            return [
                {
                    "n1":nota.n1,
                    "n2":nota.n2,
                    "matricula_aluno":nota.matricula_aluno,
                    "cod_materia":nota.cod_materia
                } for nota in notas
            ]
        except Exception as e:
            return {"Erro":str(e)}
        
    
    def carregar_nota(self, matricula_aluno:str):
        try:
            matricula_uuid = UUID(matricula_aluno)
            aluno = AlunoRepository.buscar_por_matricula(matricula_uuid)
            notas = NotasRepository.carregar_nota(aluno)
            return [
                {
                    "n1":nota.n1,
                    "n2":nota.n2,
                    "matricula_aluno":nota.matricula_aluno,
                    "cod_materia":nota.cod_materia
                } for nota in notas
            ]
        except Exception as e:
            return {"Erro":str(e)}
        
    

    def atualizar_nota(self, matricula:str, nota:Nota):
        try:
            matricula_uuid = UUID(matricula)
            resp = self.atualizar_nota(matricula_uuid, nota)
            return resp
            
        except Exception as e:
            return {"Erro":str(e)}
        

    def buscar_notas_por_professor(self, usuario_professor:str):
        try:
            professor = ProfessorRepository.buscar_por_usuario(usuario_professor)
            self.notas_repository.buscar_notas_por_professor(professor)
        except Exception as e:
            return {"Erro":str(e)}



