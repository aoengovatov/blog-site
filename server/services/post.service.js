const Post = require("../models/Post");

exports.addPost = (post) => {
    return Post.create(post);
};

exports.editPost = async (id, post) => {
    const newPost = await Post.findByIdAndUpdate(id, post, { returnDocument: "after" });

    return newPost;
};

exports.deletePost = (id) => {
    return Post.deleteOne({ _id: id });
};

exports.getPosts = async (search = "", limit = 10, page = 1) => {
    const [posts, count] = await Promise.all([
        Post.find({ title: { $regex: search, $options: "i" } })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Post.countDocument({ title: { $regex: search, $options: "i" } }),
    ]);

    return { posts, lastPage: Math.ceil(count / limit) };
};

exports.getPost = (id) => {
    return Post.findOne(id);
};
