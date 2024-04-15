const { DataTypes } = require('sequelize');
const constants = require('../../../constants/models');
const requestHooks = require('../../../utils/request')
const pg = require("../")
const User = require("./user.model")
const Server = require("./server.model")

const Request = pg.sequelize.define('Request', {
    ackBy: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM,
        values: Object.values(constants.requestStatuses), // Define the choices
        allowNull: false,
        defaultValue: constants.requestStatuses.PENDING
    },
}, { timestamps: true });


// Define associations with other models (assuming 'Server' and 'User' are already defined)
Request.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Request.belongsTo(Server, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Hooks
Request.addHook('beforeCreate', requestHooks.createKeys)
Request.addHook('beforeUpdate', requestHooks.updateRequestHook)

// Export the model for use in other parts of your application
module.exports = Request;
