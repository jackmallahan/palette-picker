let projectsData = [
	{
		project_Name: 'Please Work',
		id: 1,
		palettes: [
			{
				id: 1,
				palette_name: 'Please',
				palette_color1: '#ffffff',
				palette_color2: '#ffffff',
				palette_color3: '#ffffff',
				palette_color4: '#ffffff',
				palette_color5: '#ffffff',
				project_id: 1
			},
			{
				id: 2,
				palette_name: 'WORK',
				palette_color1: '#000000',
				palette_color2: '#000000',
				palette_color3: '#000000',
				palette_color4: '#000000',
				palette_color5: '#000000',
				project_id: 1
			}
		]
	},
	{
		project_Name: 'TEST',
		id: 2,
		palettes: [
			{
				id: 3,
				palette_name: 'TEST',
				palette_color1: '#ffffff',
				palette_color2: '#009ac9',
				palette_color3: '#123456',
				palette_color4: '#009ac9',
				palette_color5: '#789012',
				project_id: 2
			}
		]
	},
	{
		project_Name: 'Project3',
		id: 3,
		palettes: []
	}
];

const createProject = (knex, project) => {
	return knex('projects')
		.insert({
			project_Name: project.project_Name,
			id: project.id
		})
		.then(() => {
			let palettePromises = [];

			project.palettes.forEach(palette => {
				palettePromises.push(createPalette(knex, palette));
			});

			return Promise.all(palettePromises);
		});
};

const createPalette = (knex, palette) => {
	return knex('palettes').insert(palette);
};

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('palettes')
		.del()
		.then(() => knex('projects').del())
		.then(() => {
			// Inserts seed entries
			let projectPromises = [];

			projectsData.forEach(project => {
				projectPromises.push(createProject(knex, project));
			});

			return Promise.all(projectPromises);
		})
		.then(() => {
			console.log('Seeding is complete');
		})
		.catch(error => {
			console.log(`Error seeding data: ${error}`);
		});
};
