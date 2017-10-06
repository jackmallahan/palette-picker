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
  // Deletes ALL existing entries
return knex('table_name').del().then(() => knex('projects'))
		.insert({
			projectName: project.name,
			id: project.id
		})
		.then(() => {
			let palettePromises = [];

			project.palettes.forEach(palette => {
				palettePromises.push(addPalette(knex, palette));
			});

			return Promise.all(palettePromises);
		});
};

const addPalette = (knex, palette) => {
	return knex('palettes').insert(palette);
};
