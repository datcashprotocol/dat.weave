const axios = require('axios');

exports.uploadEstimate = (req, res) => {
	console.log('/price')
	const bytes = req.originalUrl.split('/')[-1]
	axios.get(`https://arweave.net/price/${bytes}`)
};