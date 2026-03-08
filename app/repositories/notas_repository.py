from model.notas import Nota
from model.disciplina import Disciplina
from repositories.aluno_repository import AlunoRepository
from repositories.professor_repository import ProfessorRepository
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import text


class NotasRepository:

    def __init__(self, db: Session):
        self.db = db

    def list(self):
        return self.db.query(Nota).all()

    def carregar_nota(self, usuario: str):
        aluno_repository = AlunoRepository(self.db)

        aluno = aluno_repository.buscar_por_email(email)

        return (self.db.query(Nota, Disciplina)
                .join(Disciplina, Disciplina.codigo == Nota.cod_materia)
                .filter(Nota.matricula_aluno == aluno.matricula).all())
    


    def carregar_nota_por_matricula(self, matricula:UUID):

        return (self.db.query(Nota, Disciplina)
                .join(Disciplina, Disciplina.codigo == Nota.cod_materia)
                .filter(Nota.matricula_aluno == matricula).all())
    


    
    def atualizar_nota(self, matricula:UUID, nota:Nota):
        nota_metodo = (
            self.db.query(Nota).
            filter(
                Nota.id_aluno == matricula,
                Nota.id_disciplina == nota.id_disciplina
            ).first()
        )

        if nota_metodo:
            nota_metodo.n1 = nota.n1
            nota_metodo.n2 = nota.n2

        else:
            nova_nota = Nota(
                matricula_aluno=matricula,
                n1=nota.n1,
                n2=nota.n2,
                cod_materia=nota.id_disciplina
            )

            self.db.add(nova_nota)
            self.db.commit()

        self.db.commit()
        return nota

    def buscar_notas_por_professor(self, usuario_professor: str):
        professor_repository = ProfessorRepository(self.db)

        professor = professor_repository.buscar_por_usuario(usuario_professor)

        sql = """
                    SELECT n.n1, n.n2, n.id_disciplina
                    FROM notas n
                    JOIN disciplina d ON d.codigo = n.id_disciplina
                    JOIN professor_disciplina pd ON d.codigo = pd.id_disciplina
                    WHERE pd.id_professor = :professor_id
            """

        notas = self.db.execute(text(sql), {"professor_id": professor.id})

        return notas.fetchall()
