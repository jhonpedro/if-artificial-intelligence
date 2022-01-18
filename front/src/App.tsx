import axios from 'axios'
import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import './app.css'

function App() {
	const [file, setFile] = useState<{ blob: string; file: File | null }>({
		blob: '',
		file: null,
	})
	const [results, setResults] = useState<
		{ car: string; probability: number }[]
	>([])
	const [loading, setLoading] = useState(false)

	const getResults = async (file: File) => {
		setLoading(true)
		try {
			const formData = new FormData()
			formData.append('image', file)

			const response = await axios.post(
				'http://localhost:3333/evaluate',
				formData
			)

			setResults(response.data)
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return
		}

		const blobUrl = URL.createObjectURL(e.target.files[0])

		setFile({
			blob: blobUrl,
			file: e.target.files && e.target.files[0],
		})

		setResults([])
		getResults(e.target.files[0])
		e.target.value = ''
	}

	return (
		<div className='container'>
			<form>
				<label className='label-image'>
					<input
						hidden
						type='file'
						accept='image/*'
						onChange={handleChangeImage}
					/>
					<span>Selecionar imagem</span>
				</label>
			</form>

			{!!file.blob && <img className='selected-image' src={file.blob} alt='' />}

			{loading && <ReactLoading type='bubbles' color='#FFF' />}

			{results.length !== 0 && (
				<div className='results'>
					{results.map((result, index) => {
						if (index === 0) {
							return (
								<p key={result.probability}>
									<strong>
										{result.car}: {result.probability.toFixed(2)}%
									</strong>
								</p>
							)
						}
						return (
							<p key={result.probability}>
								{result.car}: {result.probability.toFixed(2)}%
							</p>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default App
