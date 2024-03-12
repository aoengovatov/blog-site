const postService = require("../services/post.service");
const mapPost = require("../mappers/mapPost");

exports.addPost = async (req, res) => {
    const { title, content, imageUrl: image } = req.body;

    const newPost = await postService.addPost({
        title,
        content,
        image,
    });

    res.send({ data: mapPost(newPost) });
};

exports.editPost = async (req, res) => {
    const { title, content, imageUrl: image } = req.body;

    const updatedPost = await postService.editPost(req.params.id, {
        title,
        content,
        image,
    });

    res.send({ data: mapPost(updatedPost) });
};

exports.deletePost = async (req, res) => {
    await postService.deletePost(req.params.id);

    res.send({ error: null });
};
