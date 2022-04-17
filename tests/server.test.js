const request = require('supertest')
const app = require('../server')
const payload = require('./data/transaction.json')

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
describe('datweave API', () => {
	it('POST /wallet -> 400', () => {
		const address = '0xNonExistentAddress'
		return request(app)
			.post(`/price/${address}/balance`)
			.expect(404)
	})
	
	// it('POST /wallet -> 200', () => {
		
	// })

	it('GET /price -> 200', () => {
		const byte = 100
		return request(app)
			.get(`/price/${byte}`)
			.expect(200)
			.then((resp) => {
				expect(resp.body).not.toBeNaN()
			})
	});

	// Nothing in db yet, so should expect 404
	it('POST /chunk --> 200 #chunk 1', () => {
		return request(app)
			.post('/chunk')
			.send({
				data_root: 'data_root',
				chunk: 'chunk1',
				offset: 1
			})
			.expect(404)
	});

	it('POST /chunk --> 200 #chunk 2', () => {
		return request(app)
			.post('/chunk')
			.send({
				data_root: 'data_root',
				chunk: 'chunk2',
				offset: 2
			})
			.expect(404)
	});

	it('GET /chunk --> 404', () => {
		return request(app)
			.get('/chunk')
			.query({
				id: '0xNonExistentAddress',
				offset: '291957'
			})
			.expect(404)
	});

	it('GET /mine --> 200 [not implemented]', () => {
		return request(app)
			.get('/mine')
			.expect(200)
	});


});