const Request = require("../../database/postgres/models/request.model")
const Server = require("../../database/postgres/models/server.model")
const User = require("../../database/postgres/models/user.model")

const { Op } = require('sequelize');

const constants = require('../../constants/models');


exports.rejectRequest = async (req, res) => {
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

        const requestsToReject = requests.filter(request => request.status !== constants.requestStatuses.REJECTED)

        if(requestsToReject.length === 0) {
            return res.status(404).json({"error": `No requests to reject for user "${username}" and server "${alias}"`})
        }

        // There should be only one request to reject, so we seek to the first entry.
        const requestToReject = requestsToReject[0]
        requestToReject.status = constants.requestStatuses.REJECTED;
        requestToReject.ackBy = res.locals.user.id;

        requestToReject.save({
          alias: alias,
          username: username,
        });

        return res.status(200).json({ requestToReject })
    }

    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
