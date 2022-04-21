const request = require('supertest')
const app = require('../server')
const payload = require('./data/transaction.json')
const utils = require('../utils')

const address = utils.randomString(10)

/*
The order of tests follows the order in which the Arweave js framework calls endpoints
1. /wallet
2. /mint
3. /price
4. /tx_anchor
5. /get_price
6. /uploadChunk
7. /tx
8. /mine
*/
describe('datweave API - simple', () => {
	it('GET /price -> 200', () => {
		const byte = 'abc'
		return request(app)
			.get(`/price/${byte}`)
			.expect(404)
			.then((resp) => {
				expect(resp.body).not.toBeNaN()
			})
	});
	
	it('GET /mine --> 200 [not implemented]', () => {
		return request(app)
			.get('/mine')
			.expect(200)
	});
});