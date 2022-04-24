// The error returned by this function is handled in the error handler middleware in app.js.
const createErrorResponse = function (res, args) {
    const {statusCode, errors } = args
    const errorResponse = {
        success: false,
        data: null,
        errors: errors || [],
        
    }
    return res.status(statusCode || 400).json(errorResponse);
};

//-------------- Success Response handlers ----- 200 ------
const createSuccessResponse = function (res, args) {
    const {statusCode, data, message } = args
    const successResponse = {
        success: true,
        data: {
            result: data || null,
            message: message || ""
        },
        errors: []
    }
    return res.status(statusCode || 200).json(successResponse);
};


//---- The 400 Bad Request error----------
badRequestError = function (res, args) {
    return createErrorResponse(res, {...args, statusCode: 400});
};

//---- The 500 Internal Server error----------
internalServerError = function (res, args) {
    return createErrorResponse(res, {...args, statusCode: 500});
};

notFoundError = function (res, args) {
    return createErrorResponse(res, {...args, statusCode: 404});
};

//----------------The 200 - Sucess Response
okResponse = function (res, args) {
    return createSuccessResponse(res, {...args, statusCode: 200});
};

//-------The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.-----
createdResponse = function (res, args) {
    return createSuccessResponse(res, {...args, statusCode: 201});
};

//-----The 401 Unauthorized error-----------
unauthorizedError = function (msg) {
    return Object.assign(new Error(), {
        statusCode: 401,
        message: msg
    });
};
