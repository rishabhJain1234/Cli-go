const User = require("../../database/postgres/models/user.model")
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");

exports.makeAdmin = async (req, res) => {
    const { username, email } = req.body;
    try {
        // Find the user by username or email
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        // If user is found, update their role to admin
        if (user) {
            user.isAdmin = 'true';
            await user.save();
            res.status(200).json({ message: 'User is now an admin' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Internal server error' });
    }
    
}
