from repositories.observacoes_repository import ObervacoesRepository 
from services.aluno_service import AlunoService
from model.aluno import Aluno
from model.observacoes import Observacoes
from repositories.professor_repository import ProfessorRepository
from uuid import UUID

class ObservacoesService:

    def __init__(self, observacoes_repository:ObervacoesRepository):
        self.observacoes_repository = observacoes_repository


    def listar_observacoes(self):
        try:
            observacoes = self.observacoes_repository.list()
            return [
                {
                "mensagem": observacao.mensagem,
                "data_envio": observacao.data_envio,
                "id_destinatario": observacao.id_destinatario,
                "id_remetente": observacao.id_remetente
                } for observacao in observacoes
            ]
        except Exception as e:
            return {"Erro":str(e)}
    

    def carregar_obervacoes(self, matricula:str):
        
        try:
            matricula_uuid = UUID(matricula)
            aluno = AlunoService.buscar_por_matricula(matricula_uuid)
            observacoes = self.observacoes_repository.carregar_obervacoes(aluno)
            return [
                {
                "mensagem": observacao.mensagem,
                "data_envio": observacao.data_envio,
                "id_destinatario": observacao.id_destinatario,
                "id_remetente": observacao.id_remetente
                } for observacao in observacoes]

        except Exception as e:
            return {"Erro":str(e)}
        


    def registrar_observacao(self, observacao:Observacoes):
        try:
            observacao = self.observacoes_repository.registrar_observacao(observacao)
            return observacao
        except Exception as e:
            return {"Erro":str(e)}
        
    

    def buscar_por_remetente(self, id_remetente:str):
        try:
            id_remetente_uuid = UUID(id_remetente)
            self.observacoes_repository.buscar_por_remetente(id_remetente_uuid)
        except Exception as e:
            return {"Erro": str(e)}
        
    
    def apagar_observacao(self, usuario:str):
        try:
            professor = ProfessorRepository.buscar_por_usuario(usuario)
            self.observacoes_repository.apagar_observacao(professor)
        except Exception as e:
            return {"Erro":str(e)}

