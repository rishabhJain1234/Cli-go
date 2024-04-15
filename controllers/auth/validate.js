const basicAuth = require('basic-auth');
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const User = require("../../database/postgres/models/user.model");


exports.isValidUser = async (req, res, next) => {
    const credentials = basicAuth(req);
    
    if (!credentials || !credentials.name || !credentials.pass) {
        // Respond with a 401 Unauthorized status if credentials are not provided
        res.status(401).send('Unauthorized');
        return;
    }
    
    const user = await User.findOne({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            username: credentials.name,
                        },
                        {
                            email: credentials.name,
                        }
                    ],
                },
            ]
        },
    });

    if(!user) {
        console.log(`User not found for ${credentials.name}, ${credentials.pass}`);
        return res.status(400).json({ error: 'Invalid Credentials' });
    }

    bcrypt.compare(credentials.pass, user.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        } else {
          if(!result) {
            console.log(`Invalid Password for ${credentials.name}`);
            return res.status(400).json({ error: 'Invalid Credentials' });
          }
          else {
            res.locals.user = user;
            res.locals.password = credentials.pass;
            next();
          }
        }
    });
}

exports.isAdmin= async (req, res, next) => {
    if(!res.locals.user.isAdmin) {
        return res.status(400).json({ error: 'You need to be an admin to perform this action.' });
    }
    next();
}
