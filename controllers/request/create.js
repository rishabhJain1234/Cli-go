const Request = require("../../database/postgres/models/request.model")
const Server = require("../../database/postgres/models/server.model")
const { Op } = require('sequelize');

const constants = require('../../constants/models');


exports.createRequest = async (req, res) => {
    try {
        const { alias = "" } = req.body;
    
        // Try to find a server with the given alias
        const server = await Server.findOne({ where: { alias } });
    
        if (!server) {
          // If server does not exist, throw an error.
          return res.status(400).json({"error": `Server ${alias} not found for the given request`});
        }

        const requestCreatedBy = res.locals.user;
        const existingRequest = await Request.findOne({
            where: {
                [Op.and]: [
                    {
                        UserId: requestCreatedBy.id,
                    },
                    {
                        ServerId: server.id,
                    }
                ],
            },
        });

        if(!existingRequest){
            const request = await Request.create({
                UserId: requestCreatedBy.id,
                ServerId: server.id,
            }, {
                password: res.locals.password,
                user: requestCreatedBy,
                server: server,
            })
    
            return res.status(201).json({request});
        }

        switch (existingRequest.status) {
            case constants.requestStatuses.PENDING:
                return res.status(409).json({"error": `Request of user ${requestCreatedBy.username} is already pending for server ${alias}`})
        
            case constants.requestStatuses.APPROVED:
                return res.status(409).json({"error": `Request of user ${requestCreatedBy.username} is already approved for server ${alias}`})
        
            case constants.requestStatuses.REJECTED:
                existingRequest.status = constants.requestStatuses.PENDING
                existingRequest.save({
                    alias: alias,
                    username: res.locals.user.username,
                })
                return res.status(200).json({existingRequest})
            default:
                break;
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
