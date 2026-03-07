from repositories.aluno_repository import AlunoRepository
from uuid import UUID


class AlunoService:

    def __init__(self, aluno_repository:AlunoRepository):
        self.aluno_repository = aluno_repository


    def listar_alunos(self):
        try:
            alunos = self.aluno_repository.list()

            return [
                {
                "matricula": aluno.matricula,
                "nome": aluno.nome,
                "usuario": aluno.usuario,
                "email": aluno.email
                } for aluno in alunos
            ]
        
        except Exception as e:
            return {"Erro":str(e)}
    



    def buscar_por_email(self, email:str):

        try:

            aluno = self.aluno_repository.buscar_por_email(email)

            return {
                "matricula": aluno.matricula,
                "nome": aluno.nome,
                "usuario": aluno.usuario,
                "email": aluno.email
                } 
            

        except Exception as e:
            return {"Erro":str(e)}
        


    def buscar_por_matricula(self, matricula:str):
        
        try:
            matricula_uuid = UUID(matricula)
            aluno = self.aluno_repository.buscar_por_matricula(matricula_uuid)

            return {
                "matricula": aluno.matricula,
                "nome": aluno.nome,
                "usuario": aluno.usuario,
                "email": aluno.email
                } 
        
        except Exception as e:
            return {"Erro":str(e)}
        
    

    def pre_cadastro(self, nome:str, matricula:str, usuario:str):

        try:
            matricula_uuid = UUID(matricula)

            self.aluno_repository.pre_cadastro(nome, matricula_uuid, usuario)
        except Exception as e:
            return {"Erro":str(e)}
        

    def completar_cadatro(self, matricula:str, email:str, senha:str):
        matricula_uuid = UUID(matricula)

        resp = self.aluno_repository.completar_cadatro(matricula_uuid, email, senha)
        
        return resp


    def buscar_alunos_por_professor(self, usuario_professor:str):

        alunos = AlunoRepository.buscar_alunos_por_professor(usuario_professor)

        return [
                {
                "matricula": aluno.matricula,
                "nome": aluno.nome,
                "usuario": aluno.usuario,
                "email": aluno.email
                } for aluno in alunos
            ]



