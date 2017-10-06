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

app.post('/api/v1/palettes', (request, response) => {
	const palette = request.body;

	for (let requiredParameter of ['name', 'color1', 'color2', 'color3', 'color4', 'color5', 'projectId']) {
		if (!palette[requiredParameter]) {
			return response.status(422).send({
				error: `Expected format: { name: <String>, color1: <String>, 'color2': <String>, 'color3': <String>, 'color4': <String>, 'color5', 'projectId': <Integer> }. You're missing a ${requiredParameter} property.`
			});
		}
	}

	database('palettes')
		.insert(palette, '*')
		.then(palette => response.status(201).json(palette))
		.catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/palettes', (request, response) => {
	database('palettes')
		.select()
		.then(palette => response.status(200).json(palette))
		.catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
	console.log(`Palette Picker is running on ${app.get('port')}.`);
});
