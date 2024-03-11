const postService = require("../services/post.service");
const mapPost = require("../mappers/mapPost");

exports.getPosts = async (req, res) => {
    const { posts, lastPage } = await postService.getPosts(
        req.body.search,
        req.body.limit,
        req.body.page
    );

    res.send({ data: { lastPage, posts: posts.map(mapPost) } });
};

exports.getPost = async (req, res) => {
    const post = await postService.getPost(req.params.id);

    res.send({ data: mapPost(post) });
};
