const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
});

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection has been established successfully to ${process.env.PGHOST}: ${process.env.PGPORT}`);
    } catch (error) {
        console.error(`Unable to connect to the database ${process.env.PGDATABASE}:`, error);
    }
}

module.exports = { checkConnection, sequelize }