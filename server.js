const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/projects', (request, response) => {
	database('projects')
		.select()
		.then(project => response.status(200).json(project))
		.catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/projects', (request, response) => {
	const name = request.body;

	if (!name.name) {
		return response.status(422).send({ error: `You must include a name for your project` });
	}

	database('projects')
		.insert(name, '*')
		.then(projectObj => {
			console.log('projectObj', projectObj);
			return response.status(201).json(projectObj);
		})
		.catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
	console.log(`Palette Picker is running on ${app.get('port')}.`);
});
