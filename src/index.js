import express from 'express'

const app = express()

const PORT = 3000

const tarefas = [
    {
        id: 1, titulo: 'Estudar Express', concluida: true
    },
    {
        id: 2, titulo: 'Fazer exercícios', concluida: false
    },
    {
        id: 3, titulo: 'Estudar JavaScript', concluida: false
    }]
app.get('/', (req, res) => {
    res.send('API de Tarefas no ar')
})

app.get('/tarefas', (req, res) => {
    const concluida = req.query.concluida

    if (concluida === 'true') {
    const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida === true)

        return res.json(tarefasConcluidas)
    }
    res.json(tarefas)
})
app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)

    const tarefa = tarefas.find(tarefa => tarefa.id === id)
    if (!tarefa) {
        return res.status(404).json({
            erro: 'Tarefa não encontrada'
        })
    }
    res.json(tarefa)
})
app.post('/tarefas', (req, res) => {

    const { titulo } = req.body
    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false}

    tarefas.push(novaTarefa)
    res.status(201).json(novaTarefa)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

/* testes no postman
1. Método: GET
URL: http://localhost:3000/
Resposta (Status 200 ok)
"API de tarefas no ar"

2.
método: GET
URL: http://localhost:3000/tarefas
Resposta (Status 200 ok)
[
{
        id: 1, titulo: 'Estudar Express', concluida: true
    },
    {
        id: 2, titulo: 'Fazer exercícios', concluida: false
    },
    {
        id: 3, titulo: 'Estudar JavaScript', concluida: false
    }
]

3.
método: GET
URL: http://localhost:3000/tarefas?concluida=true
Resposta (Status 200 ok)
{
        id: 1, titulo: 'Estudar Express', concluida: true
    }

4.
método: GET
URL: http://localhost:3000/tarefas/1
Resposta (Status 200 ok)
{
        id: 1, titulo: 'Estudar Express', concluida: true
    }

5.
metodo: GET
URL: http://localhost:3000/tarefas/67
Resposta (Status 404 Not Found)
{"erro": "tarefa não encontrada"}
*/