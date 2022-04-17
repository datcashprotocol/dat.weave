const request = require('supertest')
const app = require('../server')


describe('datweave API', () => {
	it('GET /mine --> 200 [not implemented]', () => {
		return request(app)
			.get('/mine')
			.expect(200)
	});

	it('POSWT /chunk --> 200', () => {
		
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
});