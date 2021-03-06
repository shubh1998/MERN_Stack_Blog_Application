const bcrypt = require("bcrypt")
const User = require("../../models/User");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let requestData = new User({ name, email, password })
        const userExist = await User.findOne({ email });
        if (userExist) {
            return badRequestError(res, { errors: [{ message: "Email is already taken" }] })
        }

        const savedUserData = await requestData.save();

        const returnData = {
            _id: savedUserData._id,
            name: savedUserData.name,
            email: savedUserData.email,
            createdAt: savedUserData.createdAt,
            updatedAt: savedUserData.updatedAt
        }

        return okResponse(res, { data: returnData, message: "User registered successfully !" })
    } catch (error) {
        return internalServerError(res, { errors: [{ message: "Internal Server Error" }] })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });
        if (!user) {
            return badRequestError(res, { errors: [{ message: "Email not registered" }] })
        }

        const isMatchPassword = await user.authenticate(password)
        if (!isMatchPassword) {
            return badRequestError(res, { errors: [{ message: "Invalid emailId or Password" }] })
        }

        /****** Generate authenticated data and its auth_token *****/
        const authToken = await user.generateAuthToken();
        res.setHeader("Content-Type", "application/json");
        res.setHeader("AuthToken", authToken);
        res.setHeader("Access-Control-Expose-Headers", "AuthToken");
        /******-----------------------------------------------*****/

        const returnData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return okResponse(res, { data: returnData, message: "Login successfully !" });
    } catch (error) {
        return internalServerError(res, { errors: [{ message: "Internal Server Error" }] })
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return badRequestError(res, { errors: [{ message: "New password should be same as confirm password !" }] })
        }

        const user = await User.findOne({ _id: req.user._id });

        if (user) {
            const isMatchPassword = await user.authenticate(oldPassword)
            if (!isMatchPassword) {
                return badRequestError(res, { errors: [{ message: "Old password is wrong !" }] })
            }

            const hashedPassword = await bcrypt.hash(confirmPassword, 10)
            const response = await User.findOneAndUpdate({ _id: req.user._id }, { password: hashedPassword });

            return okResponse(res, { data: response, message: "Your password has been updated !" });
        }
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

const getProfileDetails = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id })
        const returnData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return okResponse(res, { data: returnData, message: "Profile details fetched successfully !" });
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body

        const response = await User.findOneAndUpdate({ _id: req.user._id }, { name, email }, { new: true });

        return okResponse(res, { data: response, message: "Profile details updated successfully !" });
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

module.exports = {
    registerUser,
    loginUser,
    changePassword,
    getProfileDetails,
    updateProfile
}