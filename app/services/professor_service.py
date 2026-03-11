from repositories.professor_repository import ProfessorRepository
from uuid import UUID


class ProfessorService:

    def __init__(self, professor_repository:ProfessorRepository):
        self.professor_repository=professor_repository

    def buscar_por_usuario(self, usuario:str):
        professor = self.professor_repository.buscar_por_usuario(usuario)

        if not professor:
            raise ValueError("Professor não encontrado")
        
        return professor
        
    
    def contar_notas_lancadas(self, usuario:str):

        return self.professor_repository.contar_notas(usuario)
    

    def calc_media_geral(self, usuario:str):

        return self.professor_repository.calc_media_geral(usuario)
    

    def login_professor(self, usuario:str, senha:str):

        professor = self.buscar_por_usuario(usuario)

        if not professor:
            raise ValueError("O professor não existe")
        
        if professor.senha != senha:
            raise ValueError("O professor não existe")
        
        return {"sucesso": True}
    
    def materias_lecionadas(self, usuario:str):

        materias = self.professor_repository.materias_lecionadas(usuario)

        return [ { 'nome': materia.nome, 'codigo': materia.codigo } for materia in materias]