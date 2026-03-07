## Endpoints
- Verificar login de Professor
  
  Modelo de resposta: 
  ```json
  {
    professor: { ... },
    alunos: [ { nome, matricula } ],
    qnt_notas: 0, // Número de notas que ele já lançou
    media_alunos: 0 // Média geral dos alunos
  }
  ```



- Verificar login de Aluno

  Modelo de resposta:
  ```json
  {
    aluno: { ... },
    notas: [ { ..., professor(es) } ],
    observaces: [ { ... } ]
  }
  ```

- Enviar observação (professor -> aluno)

  Modelo de resposta:
  ```json
  {
    observacao: { ... }
  }
  ```

- Apagar observação (professor). Resposta sem conteúdo

- Lançar nota (professor; UPSERT: se o aluno já tiver uma nota registrada daquela matéria, atualize ao invés de inserir)

  Modelo de resposta:
  ```json
  {
    nota: { ... }
  }
  ```

- Completar o cadastro do aluno (aluno). No banco, o aluno já tem que ter nome e matrícula pré-cadastrados pelo admin, mas como não vamos ter página de admin, teremos que fazer um dataload pra isso. Vou pedir pro Noé.

  Informações mínimas da request (você pode incluir mais, se precisar):
  ```json
  {
    aluno: { matricula, usuario, senha }
  }
  ```

  Modelo de resposta:
  ```json
  {
    aluno: { ... }
  }
  ```
