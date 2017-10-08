//these node modules allow us to write and use the express framework for NodeJs
const express = require('express')
const app = express()

//middleware that parses server requests bodies so it is available to use
const bodyParser = require('body-parser')
const path = require('path')

//these allow us to configure our environment so that it can be deployed to multiple servers using knex
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

//middleware to allow us to host our static files with node
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//where we implement the use of body parser middleware
app.use(bodyParser.json())

//this is where we set the port to the above environment variable
app.set('port', process.env.PORT || 3000)

//retrieves all saved projects from the database
app.get('/api/v1/projects', (request, response) => {
	//specifies what endpoint to go to
	database('projects')
		.select() //accessing the defined 'projects' database and returns a promise
		.then(project => response.status(200).json(project)) //returning a parsed copy of the entire 'project database if GET is successful'
		.catch(error => response.status(500).json({ error })) //Returns error if there is a internal server error
})

//POST to database 'projects'
app.post('/api/v1/projects', (request, response) => {
	//specifies what endpoint to go to
	const name = request.body //the fetch call should include a body with the name of the project

	if (!name.name) {
		//if there is no body included in fetch call, returns an error
		return response.status(422).send({ error: `You must include a name for your project` })
	}

	database('projects') //accesses 'projects' database
		.insert(name, '*') //inserts the request body obj with all properties and returns a promise
		.then(projectObj => {
			return response.status(201).json(projectObj) //if everything goes well, we returned a parsed object with all object properties
		})
		.catch(error => response.status(500).json({ error })) //catches error if there is an internal server error
})

//POST to database 'palettes'
app.post('/api/v1/palettes', (request, response) => {
	//specifies what endpoint to go to
	const palette = request.body //fetch call should include a body and a foreign Id which identifies which project it belongs to

	if (!palette.name && !palette.projectId) {
		return response.status(422).send({
			//if the fetch call doesn't include a palette name and foreign Id, it returns a 422 error
			error: 'You must include a name for your palette and select a project to add it to'
		})
	}

	database('palettes') //accesses 'palettes' database
		.insert(palette, '*') //inserts the request body object with all properties and returns a promise
		.then(palette => response.status(201).json(palette)) //returns a parsed object along with a 201 HTTP code
		.catch(error => response.status(500).json({ error })) //catches error and returns a 500 error for internal server error
})

//GET from 'palettes' database
app.get('/api/v1/palettes', (request, response) => {
	//specifies what endpoint to go to
	database('palettes')
		.select() //selects 'palettes' database
		.then(palette => response.status(200).json(palette)) //returns parsed palette obj from database and sends 200 HTTP code
		.catch(error => response.status(500).json({ error })) //returns 500 error if there is an internal server error
})

//DELETE from 'palettes' database
app.delete('/api/v1/palettes/:id', (request, response) => {
	//specifies what endpoint to go to
	const id = request.params //the fetch should only send the palette id to be deleted

	database('palettes')
		.where(id) //this specifies which palette we are targeting
		.del() //deletes from database
		.then(deleted => (!deleted ? response.status(422).json({ error: 'Palette not Found' }) : response.sendStatus())) //a ternary to check to see a promise is returned. If not we send the status 422 to signal palette is not found. Otherwise we send the status to signal a successful delete
		.catch(error => response.status(500).json({ error })) //internal server error sends the error
})

//starts a socket and listens for connections on the given path which we defined in the environment variables section
app.listen(app.get('port'), () => {
	console.log(`Palette Picker is running on ${app.get('port')}.`)
})

//exports our server so that we can use it in other files specifically our test
module.exports = app
