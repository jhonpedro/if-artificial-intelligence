const Express = require('express')
const evaluationRoutes = require('./controllers/evaluation')
const cors = require('cors')

const app = Express()

app.use(Express.json())
app.use(cors({ origin: '*' }))

app.use(evaluationRoutes)

app.listen(3333, () => {
	console.log('Server started on 3333')
})
