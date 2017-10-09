const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('Client Routes', () => {
	it('should return the hompage with text', done => {
		chai
			.request(server)
			.get('/')
			.end((error, response) => {
				response.should.have.status(200)
				response.should.be.html
				response.res.text.includes('Palette Picker')
				done()
			})
	})

	it('should return a 404 if given a bad route', done => {
		chai
			.request(server)
			.get('/RickRoss')
			.end((error, response) => {
				response.should.have.status(404)
				done()
			})
	})
})

describe('API Routes', () => {
	before(done => {
		database.migrate
			.rollback()
			.then(() => database.migrate.latest())
			.then(() => done())
			.catch(error => console.log(error))
	})

	beforeEach(done => {
		database.seed
			.run()
			.then(() => done())
			.catch(error => console.log(error))
	})

	describe('GET /api/v1/projects', () => {
		it('should get all projects from database', done => {
			chai
				.request(server)
				.get('/api/v1/projects')
				.end((error, response) => {
					response.should.have.status(200)
					response.should.be.json
					response.body.should.be.a('array')
					response.body.length.should.equal(1)
					response.body[0].should.have.property('id')
					response.body[0].id.should.equal(1)
					response.body[0].should.have.property('name')
					response.body[0].name.should.equal('Please Work')
					done()
				})
		})

		it('should return a 404 if the route does not exist', done => {
			chai
				.request(server)
				.get('/api/v1/pojects')
				.end((error, response) => {
					response.should.have.status(404)
					done()
				})
		})
	})

	describe('GET /api/v1/palettes', () => {
		it('should get all palettes from database', done => {
			chai
				.request(server)
				.get('/api/v1/palettes')
				.end((error, response) => {
					response.should.have.status(200)
					response.should.be.json
					response.body.should.be.a('array')
					response.body.length.should.equal(2)
					response.body[0].should.have.property('name')
					response.body[0].name.should.equal('White')
					response.body[0].should.have.property('color1')
					response.body[0].color1.should.equal('#ffffff')
					response.body[0].should.have.property('color2')
					response.body[0].color2.should.equal('#ffffff')
					response.body[0].should.have.property('color3')
					response.body[0].color3.should.equal('#ffffff')
					response.body[0].should.have.property('color4')
					response.body[0].color4.should.equal('#ffffff')
					response.body[0].should.have.property('color5')
					response.body[0].color5.should.equal('#ffffff')
					response.body[0].should.have.property('projectId')
					response.body[0].projectId.should.equal(1)
					response.body[1].should.have.property('name')
					response.body[1].name.should.equal('Black')
					response.body[1].should.have.property('color1')
					response.body[1].color1.should.equal('#000000')
					response.body[1].should.have.property('color2')
					response.body[1].color2.should.equal('#000000')
					response.body[1].should.have.property('color3')
					response.body[1].color3.should.equal('#000000')
					response.body[1].should.have.property('color4')
					response.body[1].color4.should.equal('#000000')
					response.body[1].should.have.property('color5')
					response.body[1].color5.should.equal('#000000')
					response.body[1].should.have.property('projectId')
					response.body[1].projectId.should.equal(1)
					done()
				})
		})

		it('should return a 404 if route does not exist', done => {
			chai
				.request(server)
				.get('/api/v1/paletes')
				.end((error, response) => {
					response.should.have.status(404)
					done()
				})
		})
	})

	it('should return a status code 404 if the route does not exist', done => {
		chai
			.request(server)
			.get('/api/v1/projects/Petey/Pablo')
			.end((error, response) => {
				response.should.have.status(404)
				done()
			})
	})

	describe('POST /api/v1/projects/', () => {
		it('should create a new project in the database when user saves project', done => {
			chai
				.request(server)
				.post('/api/v1/projects/')
				.send({
					id: 3,
					name: 'AWWWWYEAH'
				})
				.end((error, response) => {
					response.should.have.status(201)
					response.body.should.be.a('array')
					response.body.length.should.equal(1)
					response.body[0].should.have.property('id')
					response.body[0].id.should.equal(3)
					response.body[0].should.have.property('name')
					response.body[0].name.should.equal('AWWWWYEAH')

					chai
						.request(server)
						.get('/api/v1/projects')
						.end((error, response) => {
							response.should.have.status(200)
							response.should.be.json
							response.body.should.be.a('array')
							response.body.length.should.equal(2)
							done()
						})
				})
		})
	})

	describe('POST /api/v1/palettes', () => {
		it('should create a new palette in the database when user saves a palette', done => {
			chai
				.request(server)
				.post('/api/v1/palettes')
				.send({
					id: 3,
					name: 'A Crisp Autumn Day',
					color1: '#FF4500',
					color2: '#FFD700',
					color3: '#FFA500',
					color4: '#FF8C00',
					color5: '#000000',
					projectId: 1
				})
				.end((error, response) => {
					response.should.have.status(201)
					response.body.should.be.a('array')
					response.body.length.should.equal(1)
					response.body[0].should.have.property('name')
					response.body[0].name.should.equal('A Crisp Autumn Day')

					chai
						.request(server)
						.get('/api/v1/palettes/')
						.end((error, response) => {
							response.should.have.status(200)
							response.should.be.json
							response.body.should.be.a('array')
							response.body.length.should.equal(3)
							response.body[2].should.have.property('name')
							response.body[2].name.should.equal('A Crisp Autumn Day')
							response.body[2].should.have.property('color1')
							response.body[2].color1.should.equal('#FF4500')
							response.body[2].should.have.property('color2')
							response.body[2].color2.should.equal('#FFD700')
							response.body[2].should.have.property('color3')
							response.body[2].color3.should.equal('#FFA500')
							response.body[2].should.have.property('color4')
							response.body[2].color4.should.equal('#FF8C00')
							response.body[2].should.have.property('color5')
							response.body[2].color5.should.equal('#000000')
							response.body[2].should.have.property('projectId')
							response.body[2].projectId.should.equal(1)
							done()
						})
				})
		})
	})

	describe('DELETE /api/v1/palettes/:id', () => {
		it('should delete a palette', done => {
			chai
				.request(server)
				.delete('/api/v1/palettes/1')
				.end((error, response) => {
					response.should.have.status(204)
					done()
				})
		})

		it('should return a status code of 422 if the palette does not exist', done => {
			chai
				.request(server)
				.delete('/api/v1/palettes/69')
				.end((error, response) => {
					response.should.have.status(422)
					response.body.error.should.equal('There are no palettes here')
					done()
				})
		})
	})
})
