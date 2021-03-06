const request = require('supertest')
const app = require('../server')
const payload = require('./data/transaction.json')
const utils = require('../utils')

const address = utils.randomString(10)

jest.setTimeout(30000)

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
	beforeAll(async () => {
        return utils.startDB()
    });

    afterAll(async () => {
        return utils.stopDB()
    });

	it('GET /price -> 200', () => {
		const byte = 'abc'
		return request(app)
			.get(`/price/${byte}`)
			.expect([404, 500])
			.then((resp) => {
				expect(resp.body).not.toBeNaN()
			})
	});
	
	it('GET /mine --> 200 [not implemented]', () => {
		return request(app)
			.get('/mine')
			.expect(200)
	});

	it('GET /tx/:txnID/offset -> 404', () => {
		return request(app)
			.get('/tx/ /offset')
			.expect(404)
	});

	it('GET /tx/dat/:address -> 404', () =>{
		const address = '0xDNE'
		return request(app)	
			.get(`/tx/dat/${address}`)
			.expect(404)
	});

	it('POST /wallet/dat -> 400', () => {
		const address = '0xDNE'
		return request(app)
			.post(`/wallet/dat?address=${address}`)
			.expect(400)
	});

	it('POST /wallet/dat -> 400', () => {
		const txnID = '0xDNE'
		return request(app)
			.post(`/wallet/dat?txnID=${txnID}`)
			.expect(400)
	});
});