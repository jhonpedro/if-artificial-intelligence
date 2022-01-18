const { randomUUID } = require('crypto')
const { Router } = require('express')
const multer = require('multer')
const { resolve } = require('path')
const getPredictions = require('../evaluation/getPredictions')

const upload = multer({
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', 'uploads', 'tmp'),
		filename: (req, file, cb) => {
			cb(null, `${randomUUID()}.${file.mimetype.split('/')[1]}`)
		},
	}),
})

const evaluationRoutes = Router()

evaluationRoutes.post('/evaluate', upload.single('image'), async (req, res) => {
	const predictionRaw = await getPredictions(req.file.path)

	const predictionFormated = predictionRaw.map((evaluationResult) => {
		const [car, probability] = evaluationResult
			.replace(/ /g, '')
			.replace(/_/g, ' ')
			.split(':')

		return { car, probability: +probability }
	})

	res.json(predictionFormated)
})

module.exports = evaluationRoutes
