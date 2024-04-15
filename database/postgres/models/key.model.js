const { DataTypes } = require('sequelize');
const pg = require('../');
const User = require('./user.model');
const Server = require('./server.model');

const Key = pg.sequelize.define('Key', {
    privateKey: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publicKey: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
    },
});


// Define associations with other models (assuming 'Server' and 'User' are already defined)
Key.belongsTo(Server);
Key.belongsTo(User);

// Export the model for use in other parts of your application
module.exports = Key;
