const BlogPost = require("../../models/BlogPost");

const createBlogPost = async (req, res) => {
    try {
        const { title, body, description, slug } = req.body;
        const image = req.file;
        let validationErrors = []
        if (!title) validationErrors.push({ message: 'Title is required !' })
        if (!body) validationErrors.push({ message: 'Body is required !' })
        if (!description) validationErrors.push({ message: 'Description is required !' })
        if (!slug) validationErrors.push({ message: 'Slug is required !' })
        if (!image) {
            validationErrors.push({ message: 'Image is required' })
        } else {
            const { mimetype, size } = image;
            const split = mimetype.split('/');
            const extension = split[1].toLowerCase();
            // if size greater than 1 mb
            if (size > 1000000) {
                validationErrors.push({ msg: `Image size should be less than 1 mb.` });
            }
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                validationErrors.push({ msg: `Image should be in jpg, jpeg or png format` });
            }
        }
        const checkSlugExist = await BlogPost.findOne({ slug });
        if (checkSlugExist) validationErrors.push(({ message: "Please choose a unique slug/URL !" }))
        if (validationErrors.length) {
            return badRequestError(res, { errors: validationErrors })
        }
        const bodPayload = {
            title,
            body,
            description,
            slug,
            image: image.filename,
            userName: req.user.name,
            userId: req.user._id
        }
        const returnData = await BlogPost.create(bodPayload);
        return okResponse(res, { data: returnData, message: "Blog post created successfully !" })
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

const fetchAllPostsOfUser = async (req, res) => {
    try {
        let returnData = { result: null, total_documents: 0 }
        const page = req.query.page;
        const perPage = req.query.limit;


        if (page && perPage) {
            const skip = (page - 1) * perPage;

            returnData.total_documents = await BlogPost.find({ userId: req.user._id }).countDocuments();
            returnData.result = await BlogPost.find({ userId: req.user._id }).skip(skip).limit(perPage).sort({ createdAt: -1 });
        } else {
            returnData.result = await BlogPost.find({ userId: req.user._id })
        }

        return okResponse(res, { data: returnData, message: "All posts fetched successfully !" })
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

const fetchPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const getPostDetail = await BlogPost.findOne({ _id: id });
        return okResponse(res, { data: getPostDetail, message: "Post fetched successfully !" })
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

const deletePostById = async (req, res) => {
    try {
        const id = req.query.blog_id;
        const deletedPostDetail = await BlogPost.findByIdAndRemove({ _id: id });
        return okResponse(res, { data: deletedPostDetail, message: "Post deleted successfully !" })
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

const fetchAllPosts = async (req, res) => {
    try {
        let returnData = { result: null, total_documents: 0 }
        const page = req.query.page;
        const perPage = req.query.limit;

        if (page && perPage) {
            const skip = (page - 1) * perPage;
            
            returnData.total_documents = await BlogPost.find({}).countDocuments();
            returnData.result = await BlogPost.find({}).skip(skip).limit(perPage).sort({ createdAt: -1 });
        } else {
            returnData.result = await BlogPost.find({})
        }

        return okResponse(res, { data: returnData, message: "All posts fetched successfully !" })
    } catch (error) {
        return internalServerError(res, { errors: [{ message: error.message }] })
    }
}

module.exports = {
    createBlogPost,
    fetchAllPostsOfUser,
    fetchPostById,
    deletePostById,
    fetchAllPosts
}