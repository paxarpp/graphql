import { posts } from "../mockData/db";

export const createPost = (parent, { post }, context, info) => {
    post.id = Math.max(...posts.map(p => p.id)) + 1;
    posts.push(post);
    return post;
};
export const updatePost = (parent, { post }, context, info) => {
    let prevPost = posts.find(p => +p.id === +post.id);
    if (prevPost === undefined) throw new Error("Post not found.");
    Object.assign(prevPost, post);
    return prevPost;
};
export const deletePost = (parent, { id }, context, info) => {
    const postIndex = posts.findIndex(post => +post.id === +id);
    if (postIndex === -1) throw new Error("Post not found.");
    const deletedPosts = posts.splice(postIndex, 1);
    return deletedPosts[0];
};