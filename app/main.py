from schemas.nota_schema import notaCreate
from schemas.observcao_schema import observacaoCrete


from repositories.professor_repository import ProfessorRepository
from repositories.aluno_repository import AlunoRepository
from repositories.notas_repository import NotasRepository
from repositories.observacoes_repository import ObservacoesRepository

from services.professor_service import ProfessorService
from services.aluno_service import AlunoService
from services.notas_service import NotasService
from services.observacoes_service import ObservacoesService
from core.init_db import init_db
from core.database import get_db



from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi import Depends
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from starlette.exceptions import HTTPException as StarletteHTTPException


app = FastAPI()
app.mount("/assets", StaticFiles(directory="../frontend/dist/assets"), name="assets")


@app.on_event("startup")
def startup():
    init_db()


@app.exception_handler(StarletteHTTPException)
async def spa_hanler(request, exc):
    if exc.status_code == 404:
        return FileResponse("../frontend/dist/index.html")
    raise exc


@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"error": str(exc)}
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Erro interno no servidor"
        }
    )


@app.get("/api/login-professor/{usuario}/{senha}")
def get_veri_professor(usuario:str, senha:str, db: Session = Depends(get_db)):
    professor_service = ProfessorService(ProfessorRepository(db))
    aluno_service = AlunoService(AlunoRepository(db))

    professor = professor_service.login_professor(usuario, senha)
    alunos = aluno_service.buscar_alunos_por_professor(usuario)
    qnt_notas = professor_service.contar_notas_lancadas(usuario)
    media_alunos = professor_service.calc_media_geral(usuario)
    materias = professor_service.materias_lecionadas(usuario)

    return {
        "professor":professor.to_dict(),
        "qnt_notas":qnt_notas,
        "media_alunos":media_alunos,
        "alunos":alunos,
        "materias":materias
    }


@app.get("/api/login-aluno/{email}/{senha}")
def get_veri_aluno(email:str, senha:str, db: Session = Depends(get_db)):
    aluno_service = AlunoService(AlunoRepository(db))
    notas_service = NotasService(NotasRepository(db))
    observacoes_service = ObservacoesService(ObservacoesRepository(db))

    aluno = aluno_service.login_aluno(email, senha)
    notas_aluno = notas_service.carregar_nota(email)
    observacoes_aluno = observacoes_service.carregar_obervacoes(email)

    return {
        "aluno":aluno.to_dict(),
        "notas": notas_aluno,
        "observacoes_aluno":observacoes_aluno
    }


@app.post("/api/enviar-observacao/")
def enviar_observcao(observacao:observacaoCrete, db: Session = Depends(get_db)):
    observacoes_service = ObservacoesService(ObservacoesRepository(db))

    observacoes = observacoes_service.registrar_observacao(observacao)

    return {"observacao":observacoes}


@app.delete("/api/deletar-observacao/{usuario}")
def apagar_observcao(usuario:str, db: Session = Depends(get_db)):
    observacoes_service = ObservacoesService(ObservacoesRepository(db))

    observacoes_service.apagar_observacao(usuario)


@app.post("/api/lancar-nota/{matricula}")
def lancar_nota(matricula:str, nota:notaCreate, db: Session = Depends(get_db)):
    notas_service = NotasService(NotasRepository(db))

    nota_resp = notas_service.atualizar_nota(matricula, nota)

    return {"nota":nota_resp.to_dict()}


@app.post("/api/completar-cadastro/{matricula}/{email}/{senha}")
def completar_cadastro_endpoint(matricula:str, email:str, senha:str, db: Session = Depends(get_db)):
    aluno_service = AlunoService(AlunoRepository(db))

    resposta = aluno_service.completar_cadatro(matricula, email, senha)

    return {"aluno":resposta.to_dict()}



@app.get("/api/aluno/recuperar-nota/{matricula}")
def recuperar_notas(matricula:str, db: Session = Depends(get_db)):
    notas_service = NotasService(NotasRepository(db))

    notas = notas_service.carregar_nota_por_matricula(matricula)

    return {"notas":notas}


@app.get("/api/aluno/carregar-observacoes/{matricula}")
def carregar_observacoes(matricula:str, db: Session = Depends(get_db)):
    observacoes_service = ObservacoesService(ObservacoesRepository(db))

    observacoes = observacoes_service.carregar_obervacoes_por_matricula(matricula)

    return {"observacoes":observacoes}
