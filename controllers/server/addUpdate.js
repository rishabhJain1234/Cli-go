const { Op } = require("sequelize");
const Server = require("../../database/postgres/models/server.model")
const constants = require("../../constants/controllers/server")

exports.addOrUpdate = async (req, res) => {
    try {
        const { users = constants.DEFAULT_USERS, ipAddress, port = constants.DEFAULT_PORT, alias } = req.body;
    
        // Try to find a server with the given alias
        const existingServer = await Server.findOne({ 
          where: { 
            [Op.or]: [
                {
                    alias: alias,
                },
                {
                  [Op.and] : [
                    {
                      ipAddress: ipAddress,
                      port: port,                      
                    }
                  ]
                }
            ],
          } 
        });

        if (existingServer) {
          // If server exists, update its attributes
          const updatedServer = await existingServer.update({ users, ipAddress, port, alias });
          return res.status(200).json(updatedServer);
        } else {
          // If server does not exist, create a new one
          const newServer = await Server.create({ users, ipAddress, port, alias });
          return res.status(201).json(newServer);
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
