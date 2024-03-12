const commentService = require("../services/comment.service");

exports.deleteComment = async (req, res) => {
    await commentService.deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
};
