const { writeFileSync } = require('fs')
const path = require('path')
const getPredictions = require('./getPredictions')

;(async () => {
	const excel = [['Tipo', 'Nome arquivo', 'Valor mais alto']]

	const carType = 'sport-car'

	for (let i = 1; i <= 25; i++) {
		const fileName = `${carType}-${i}.jpg`

		console.log(`Evaluating = ${fileName}`)

		const predictions = await getPredictions(
			path.join(__dirname, 'imgs-pablo', carType, fileName)
		)

		excel.push([
			carType,
			fileName,
			(predictions.find((p) => p.car === carType)?.probability || 0.0).toFixed(
				2
			),
		])
	}

	writeFileSync(
		`${carType}-${Date.now()}.csv`,
		excel.reduce(
			(acc, currentValue) => acc + currentValue.join(';').toString() + '\n',
			''
		)
	)
})()
