const { Schema, model } = require('mongoose');
const commentSchema = new Schema(
	{
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'blogposts',
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Comment = model('comment', commentSchema);

module.exports = Comment