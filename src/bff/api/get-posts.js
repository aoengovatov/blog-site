import { transformPost } from "../transformers";

export const getPosts = (searchPhrase, page, limit) =>
    fetch(
        `http://localhost:3005/posts?title_like=${searchPhrase}&_page=${page}&_per_page=${limit}`
    )
        .then((loadedPosts) => loadedPosts.json())
        .then((loadedPosts) => ({
            data: loadedPosts && loadedPosts.data.map(transformPost),
            lastPage: loadedPosts.last,
        }));
