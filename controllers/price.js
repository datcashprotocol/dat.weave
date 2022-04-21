const axios = require('axios');

exports.uploadEstimate = (req, res) => {
	const bytes = req.originalUrl.split('/').at(-1) // TODO: make into a :bytes param in api/price.js
	console.log(`GET /price/${bytes}`)
	
	axios.get(`https://arweave.net/price/${bytes}`)
	.catch((err) => {
		// if cannont reach, send back resp anyways. e.g. dev'ing locally.
		res.status(404).json({ data: -1 })
		return
	})
	.then((price) => {
		if(price === undefined || price == null) {
			// TODO: Update new way to get Arweave price data
			res.status(200).json({ data: -1 })
		}
		else {
			res.status(200).json({ data: price.data })
		}
	})
};