const { DataTypes } = require('sequelize');
const pg = require("../")
const serverHooks = require("../../../utils/server")

const Server = pg.sequelize.define('Server', {
    users: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    ipAddress: {
        type: DataTypes.STRING,
        validate: {
            isIP: {
                args: [4], // Specify IPv4 validation
                msg: 'Invalid IP Address',
            },
        },
    },
    port: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                min: 0,
                max: 65536,
                msg: 'Invalid Port',
            },
        },
        defaultValue: 22,
    },
    alias: {
        type: DataTypes.STRING,
        unique: true,
    },
    authorizedKeysPath: {
        type: DataTypes.STRING,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['ipAddress', 'port'],
        },
    ],
});

// Hooks
Server.addHook('beforeCreate', serverHooks.createServerHook)
Server.addHook('beforeUpdate', serverHooks.updateServerHook)
Server.addHook('beforeDestroy', serverHooks.deleteServerHook)

// Export the model for use in other parts of your application
module.exports = Server;
