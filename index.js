import express from 'express'

const app = express()

const PORT = 3000

const tarefas = [
    {
        id: 1, titulo: 'Estudar PTAS', concluida: true
    },
    {
        id: 2, titulo: 'Fazer exercícios', concluida: false
    },
    {
        id: 3, titulo: 'Estudar Matemática', concluida: false
    }]

app.get('/', (req, res) => {
    res.send('API de Tarefas no ar')
})

app.get('/tarefas', (req, res) => {
    res.json(tarefas)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})