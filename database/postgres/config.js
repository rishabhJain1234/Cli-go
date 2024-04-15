require('dotenv').config()

module.exports = {
    development: {
      username:  process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      dialect: 'postgres', // or 'mysql', 'sqlite', etc.
    },
    // Add configurations for other environments if needed (e.g., 'test', 'production')
};
