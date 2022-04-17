const axios = require('axios');

exports.uploadEstimate = (req, res) => {
	console.log('/price')
	const bytes = req.originalUrl.split('/').at(-1)
	
	axios.get(`https://arweave.net/price/${bytes}`)
	.catch((err) => {
		// if cannont reach, send back resp anyways. e.g. dev'ing locally.
		res.status(200).json({ data: 1 })
	})
	.then((price) => {
		if(price.hasOwnProperty('data')) {
			res.status(200).json({ data: price.data })
		}
	})
};