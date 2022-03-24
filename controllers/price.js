const axios = require('axios');

exports.price = (req, res) => {
	axios.get('https://api.coingecko.com/api/v3/simple/price?ids=arweave&vs_currencies=usd').then(result => {
		res.json({
			data: result.data.arweave.usd,
			denomination: 'usd'
		})
	})
};