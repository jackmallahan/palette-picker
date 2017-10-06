// Update with your config settings.

module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://localhost/palette_picker',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/dev'
		},
		useNullAsDefault: true
	},

	test: {
		client: 'pg',
		connection: 'postgres://localhost/palette_picker_test',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/test'
		},
		useNullAsDefault: true
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
