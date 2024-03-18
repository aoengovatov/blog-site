const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.addComment = async (postId, comment) => {
    const newComment = await Comment.create(comment);

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

    await newComment.populate("author");

    return newComment;
};

exports.deleteComment = async (postId, commentId) => {
    await Comment.deleteOne({ _id: commentId });
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
};