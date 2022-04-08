const axios = require('axios');

exports.uploadEstimate = (req, res) => {
	console.log('/price')
	const bytes = req.originalUrl.split('/').at(-1)
	
	axios.get(`https://arweave.net/price/${bytes}`)
	.then((price) => {
		res.json({ data: price.data })
	})
};