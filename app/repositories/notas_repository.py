from model.notas import Nota
from model.aluno import Aluno
from model.professor import Professor
from uuid import UUID

class NotasRepository:

    def __init__(self, db):
        self.db = db


    def list(self):
        return self.db.query(Nota).all()



    
    def carregar_nota(self, aluno:Aluno):
        return self.db.query(Nota.n1, Nota.n2, Nota.cod_materia).filter(Nota.matricula_aluno == aluno.matricula).all()
    


    
    def atualizar_nota(self, matricula:UUID, nota:Nota):
        nota_metodo = (
            self.db.query(Nota).
            filter(
                Nota.matricula_aluno == matricula,
                Nota.cod_materia == nota.cod_materia
            ).first()
        )

        if nota:
            nota_metodo.n1 = nota.n1
            nota_metodo.n2 = nota.n2
            
        else:
            nova_nota = Nota(
                matricula_aluno=matricula,
                n1=nota.n1,
                n2=nota.n2,
                cod_materia=nota.cod_materia
            )

            self.db.add(nova_nota)

        return nota   




    def buscar_notas_por_professor(self, professor:Professor):

        sql = """
                    SELECT n.n1, n.n2, n.id_disciplina
                    FROM notas n
                    JOIN disciplina d ON d.codigo = n.id_disciplina
                    JOIN professor_disciplina pd ON d.codigo = pd.id_disciplina
                    WHERE pd.id_professor = :professor_id
            """

        notas = self.db.execute(sql, {"professor_id": professor.id})

        return notas.fetchall()
    
    




