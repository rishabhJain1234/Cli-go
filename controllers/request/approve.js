const Request = require("../../database/postgres/models/request.model")
const Server = require("../../database/postgres/models/server.model")
const User = require("../../database/postgres/models/user.model")

const { Op } = require('sequelize');

const constants = require('../../constants/models');


exports.approveRequest = async (req, res) => {
    try {
        const { alias = "", username = "" } = req.body;
    
        const requests = await Request.findAll({
            include: [
              {
                model: User,
                where: { username: username },
              },
              {
                model: Server,
                where: { alias: alias },
              },
            ],
        })

        if(!requests){
            return res.status(400).json({"error": `Invalid user "${username}" or server "${alias}"`})
        }

        const requestsToApprove = requests.filter(request => request.status !== constants.requestStatuses.APPROVED)

        if(requestsToApprove.length === 0) {
            return res.status(404).json({"error": `No requests to approve for user "${username}" and server "${alias}"`})
        }

        // There should be only request to approve, so we seek to the first entry.
        const requestToApprove = requestsToApprove[0]
        requestToApprove.status = constants.requestStatuses.APPROVED;
        requestToApprove.ackBy = res.locals.user.id;

        requestToApprove.save({
          alias: alias,
          username: username,
        });

        return res.status(200).json({ requestToApprove })
    }

    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
