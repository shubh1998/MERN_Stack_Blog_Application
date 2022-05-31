const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    auth_token: {
        type: String,
    }
}, { timestamps: true })

//Hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

//Created static methods
userSchema.methods = {
    authenticate: function (password) {
        const user = this
        return bcrypt.compare(password, user.password)  // either return "true or "false
    },
    generateAuthToken: async function () {
        const user = this;
        const payload = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
        }
        const jwtAuthToken = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        user.auth_token = jwtAuthToken
        await user.save();
        return jwtAuthToken;
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;