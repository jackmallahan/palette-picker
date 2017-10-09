exports.seed = (knex, Promise) => {
	return knex('palettes')
		.del()
		.then(() => knex('projects').del())
		.then(() => {
			return Promise.all([
				knex('projects')
					.insert(
						{
							id: 1,
							name: 'Please Work'
						},
						'id'
					)
					.then(() => {
						return knex('palettes').insert([
							{
								id: 1,
								name: 'White',
								color1: '#ffffff',
								color2: '#ffffff',
								color3: '#ffffff',
								color4: '#ffffff',
								color5: '#ffffff',
								projectId: 1
							},
							{
								id: 2,
								name: 'Black',
								color1: '#000000',
								color2: '#000000',
								color3: '#000000',
								color4: '#000000',
								color5: '#000000',
								projectId: 1
							}
						])
					})
					.then(() => console.log('Seed Planted'))
					.catch(error => console.log(`Seed error: ${error}`))
			])
		})
		.catch(error => console.log(`Seed error: ${error}`))
}
