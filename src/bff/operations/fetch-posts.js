import { getPosts, getComments } from "../api";
import { getCommentsCount } from "../utils";

export const fetchPosts = async (searchPhrase, page, limit) => {
    const [posts, comments] = await Promise.all([
        getPosts(searchPhrase, page, limit),
        getComments(),
    ]);

    const postData = posts.data.map((post) => ({
        ...post,
        commentsCount: getCommentsCount(comments, post.id),
    }));

    return {
        error: null,
        res: {
            postData,
            lastPage: posts.lastPage,
        },
    };
};
