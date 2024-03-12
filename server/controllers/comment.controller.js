const commentService = require("../services/comment.service");
const mapComment = require("../mappers/mapComment");

exports.addComment = async (req, res) => {
    const newComment = await commentService.addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id,
    });

    res.send({ data: mapComment(newComment) });
};


