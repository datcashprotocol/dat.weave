const axios = require('axios');

exports.uploadEstimate = (req, res) => {
	const bytes = req.originalUrl.split('/').at(-1) // TODO: make into a :bytes param in api/price.js
	console.log(`GET /price/${bytes}`)
	
	// Note: If this Jest test does not pass, increase the timeout
	// The default setting is 5000ms, but this didn't seem long enough during
	// most tests even though this URL works in the browser.
	axios.get(`https://arweave.net/price/${bytes}`, { timeout: 20000 })
	.catch((err) => {
		// if cannont reach, send back resp anyways. e.g. dev'ing locally.
		res.status(404).json({ data: -1 })
		return
	})
	.then((price) => {
		if(price !== undefined && price != null) {
			res.status(200).json({ data: price.data })
		}
	})
};