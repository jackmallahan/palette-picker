const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

before(done => {
	database.migrate
		.latest()
		.then(() => {
			database.seed.run();
		})
		.then(() => {
			done();
		})
		.catch(error => {
			console.log(error);
		});
});

describe('Client Routes', () => {
	it('should return the homepage with text', done => {
		chai
			.request(server)
			.get('/')
			.end((error, response) => {
				response.should.have.status(200);
				response.should.be.html;
				response.res.text.should.include('Palette Picker');
				done();
			});
	});
});
