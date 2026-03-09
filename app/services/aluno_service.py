from repositories.aluno_repository import AlunoRepository
from uuid import UUID


class AlunoService:

    def __init__(self, aluno_repository: AlunoRepository):
        self.aluno_repository = aluno_repository

    def listar_alunos(self):

        alunos = self.aluno_repository.list()

        return [
            {
                "matricula": aluno.matricula,
                "nome": aluno.nome,
                "usuario": aluno.email,
                "email": aluno.email
            } for aluno in alunos
        ]

    def buscar_por_email(self, email: str):

        aluno = self.aluno_repository.buscar_por_usuario(email)

        if not aluno:
            raise ValueError("Aluno não encontrado")

        return aluno

    def buscar_por_matricula(self, matricula: str):
        matricula_uuid = UUID(matricula)

        aluno = self.aluno_repository.buscar_por_matricula(matricula_uuid)
        if not aluno:
            raise ValueError("Aluno não encontrado")
        else:
            return {
                "matricula": aluno.matricula,
                "nome": aluno.nome,
                "usuario": aluno.email,
                "email": aluno.email
            }

    def pre_cadastro(self, nome: str, matricula: str, usuario: str):

        matricula_uuid = UUID(matricula)
        return self.aluno_repository.pre_cadastro(
            nome,
            matricula_uuid,
            usuario
        )

    def completar_cadatro(self, matricula: str, usuario: str, senha: str):
        matricula_uuid = UUID(matricula)

        return self.aluno_repository.completar_cadatro(matricula_uuid, usuario, senha)

    def buscar_alunos_por_professor(self, usuario_professor: str):

        alunos = self.aluno_repository.buscar_alunos_por_professor(
            usuario_professor)

        return [
            aluno.to_dict() for aluno in alunos
        ]

    def login_aluno(self, email: str, senha: str):

        aluno = self.buscar_por_email(email)

        if not aluno:
            raise ValueError("O aluno não existe")
        if aluno.senha != senha:
            raise ValueError("O aluno não existe")

        return aluno
