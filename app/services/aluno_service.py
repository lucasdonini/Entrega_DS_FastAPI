from repositories.aluno_repository import AlunoRepository
from repositories.notas_repository import NotasRepository
from uuid import UUID


class AlunoService:

    def __init__(self, aluno_repository: AlunoRepository, notas_repository: NotasRepository):
        self.aluno_repository = aluno_repository
        self.notas_repository = notas_repository

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
        print("\n\nRequisição longa: Recuperar notas dos alunos")

        alunos = self.aluno_repository.buscar_alunos_por_professor(
            usuario_professor)
        
        alunos_completos = []

        i = 1
        for aluno in alunos:
            notas_aluno = self.notas_repository.carregar_nota_por_matricula(aluno.matricula)
            print(f'{i}) Notas recuperadas: {aluno.nome}')
            i += 1
            
            notas_resposta = [{"n1": n[0].n1, "n2": n[0].n2} for n in notas_aluno]

            alunos_completos.append({"matricula": str(aluno.matricula),
                "nome": aluno.nome,
                "usuario": aluno.email,
                "notas": notas_resposta
                })
        return alunos_completos

    def login_aluno(self, email: str, senha: str):

        aluno = self.buscar_por_email(email)

        if not aluno:
            raise ValueError("O aluno não existe")
        if aluno.senha != senha:
            raise ValueError("O aluno não existe")

        return aluno
    

    
