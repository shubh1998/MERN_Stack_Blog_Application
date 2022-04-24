const registerUser = async(req, res) => {
    try {
        const requestPayload = req.body
        return okResponse(res, { data: requestPayload, message: "User registered successfully !" })
    } catch (error) {
        console.log(error)
        return internalServerError(res, { errors: [{ message: "Internal Server Error" }] })
    }
}

module.exports = {
    registerUser
}