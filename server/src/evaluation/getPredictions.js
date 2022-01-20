const path = require('path')
const { PythonShell } = require('python-shell')

/**
 * @returns {Promise<Array<string>>}
 */
module.exports = getPredictions = async (filename) =>
	new Promise((resolve, rejects) => {
		PythonShell.run(
			path.resolve(__dirname, 'imageRecognition.py'),
			{ args: [filename] },
			(err, results) => {
				if (err || !results) rejects(err)

				resolve(
					results?.map((evaluationResult) => {
						const [car, probability] = evaluationResult
							.replace(/ /g, '')
							.replace(/_/g, ' ')
							.split(':')

						return { car, probability: +probability }
					}) || []
				)
			}
		)
	})
