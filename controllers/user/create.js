const User = require("../../database/postgres/models/user.model")
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    const { username, email } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        username: username,
                    },
                    {
                        email: email,
                    }
                ],
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user

        // TODO: Send an email to the user with this default password
        const defaultPassword = Math.random().toString(36).slice(-8);
        console.log(defaultPassword)

        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
