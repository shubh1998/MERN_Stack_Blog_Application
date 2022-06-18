const BlogPost = require("../../models/BlogPost");
const Comment = require("../../models/Comment");

const createBlogPost = async (req, res) => {
    const blog_id = req.query.blog_id

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
                validationErrors.push({ message: `Image size should be less than 1 mb.` });
            }
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                validationErrors.push({ message: `Image should be in jpg, jpeg or png format` });
            }
        }
        let checkSlugExist = null
        if (blog_id) {
            checkSlugExist = await BlogPost.findOne({ slug, _id: { $ne: blog_id } });
        } else {
            checkSlugExist = await BlogPost.findOne({ slug });
        }

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

        let returnData = {}
        if (blog_id) {
            returnData = await BlogPost.findByIdAndUpdate({ _id: blog_id }, bodPayload);
        } else {
            returnData = await BlogPost.create(bodPayload);
        }

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
        const id = req.query.blog_id;
        const slug = req.query.slug
        let getPostDetail = {}
        if(id && slug) {
            const comments = await Comment.find({ postId: id }).sort({
                updatedAt: -1,
            });
            const postDetail = await BlogPost.findOne({ slug: slug,  _id: id });
            getPostDetail = {
                postDetail,
                comments
            }
        } else if(id){
            getPostDetail = await BlogPost.findOne({ _id: id });
        }
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

const AddCommentOnBlogPost = async (req, res) => {
	const { id, comment} = req.body;

	try {
		const response = await Comment.create({
			postId: id,
			comment,
			userName: req.user.name,
		});

        return okResponse(res, { data: response, message: "Your comment has been published !" })
	} catch (error) {
		return internalServerError(res, { errors: [{ message: error.message }] })
	}
};

module.exports = {
    createBlogPost,
    fetchAllPostsOfUser,
    fetchPostById,
    deletePostById,
    fetchAllPosts,
    AddCommentOnBlogPost
}