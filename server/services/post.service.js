const Post = require("../models/Post");

exports.addPost = async (post) => {
    const newPost = await Post.create(post)
    
    newPost.populate({
        path: "comments",
        populate: "author",
    });

    return newPost;
};

exports.editPost = async (id, post) => {
    const newPost = await Post.findByIdAndUpdate(id, post, { returnDocument: "after" });

    await newPost.populate({
        path: "comments",
        populate: "author",
    });

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
        Post.countDocuments({ title: { $regex: search, $options: "i" } }),
    ]);

    return { posts, lastPage: Math.ceil(count / limit) };
};

exports.getPost = (id) => {
    return Post.findById(id).populate({ path: "comments", populate: "author" });
};
