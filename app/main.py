from fastapi import FastAPI
from services.aluno_service import AlunoService
from services.notas_service import NotasService
from services.observacoes_service import ObservacoesService
from services.professor_service import ProfessorService
from model.observacoes import Observacoes
from model.notas import Nota

from core.init_db import init_db

app = FastAPI()


@app.get("/api/login-professor-verificacao/{usuario}")
def get_veri_professor(usuario:str):
    init_db()

    professor = ProfessorService.buscar_por_usuario(usuario)
    alunos = AlunoService.buscar_alunos_por_professor(usuario)
    qnt_notas = ProfessorService.contar_notas_lancadas(usuario)
    media_alunos = ProfessorService.calc_media_geral(usuario)

    return {
        "professor":professor,
        "qnt_professores":qnt_notas,
        "media_alunos":media_alunos,
        "alunos":alunos
    }


@app.get("/api/login-aluno-verificacao/{matricula}")
def get_veri_aluno(matricula:str):
    init_db()
    aluno = AlunoService.buscar_por_matricula(matricula)
    notas_aluno = NotasService.carregar_nota(matricula)
    observacoes_aluno = ObservacoesService.carregar_obervacoes(matricula)

    return {
        "aluno":aluno,
        "notas": notas_aluno,
        "observacoes_aluno":observacoes_aluno
    }


@app.post("/api/enviar-observacao/{observacao}")
def enviar_observcao(observacao:Observacoes):
    init_db()
    observacao = ObservacoesService.registrar_observacao(observacao)


@app.delete("/api/enviar-observacao/{usuario}")
def apagar_observcao(usuario:str):
    init_db()
    ObservacoesService.apagar_observacao(usuario)



@app.post("/api/lancar-nota/{matricula}/{nota}")
def lancar_nota(matricula:str, nota:Nota):
    init_db()

    nota_resp = NotasService.atualizar_nota(matricula, nota)

    return {"nota":nota_resp}


@app.post("/api/compoletar-cadastro/{matricula}/{email}/{senha}")
def completar_cadastro_endpoint(matricula:str, email:str, senha:str):

    resposta = AlunoService.completar_cadatro(matricula, email, senha)

    return {"aluno":resposta}
