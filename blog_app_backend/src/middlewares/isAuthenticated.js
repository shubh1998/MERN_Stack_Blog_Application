const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization;
        const token = authHeaders.split('Bearer ')[1];
        const jwtDecode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        let userObj = await User.findOne({
            auth_token: token,
            _id: jwtDecode._id,
        })

        if (!userObj) return unauthorizedError(res, { errors: [{ message: "UnAuthorized" }] })

        const user = {
            _id: userObj._id.toString(),
            name: userObj.name,
            email: userObj.email
        }
        req.user = user

        next();
    } catch (error) {
        return unauthorizedError(res, { errors: [{ message: "UnAuthorized" }] })
    }
};

module.exports = isAuthenticated