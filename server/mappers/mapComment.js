module.exports = function (comment) {
    return {
        content: post.content,
        author: comment.author.login,
        id: comment._id,
        publishedAt: comment.createdAt,
    };
};
