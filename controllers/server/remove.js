const { Op } = require("sequelize");
const Server = require("../../database/postgres/models/server.model")
const constants = require("../../constants/controllers/server")

exports.removeServer = async (req, res) => {
    const alias = req.params.alias;
    // Try to find a server with the given alias

    const existingServer = await Server.findOne({ 
        where: { 
          alias
        } 
    });

    if (!existingServer) {
        return res.status(404).json(`Server with alias ${alias} does not exist`);
    }
    
    await existingServer.destroy()
    return res.status(200).json("Deleted")
}
