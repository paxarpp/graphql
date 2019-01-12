import { posts } from "../mockData/db";

export const createPost = (parent, { id, title, content, date, creatorId }, context, info) => {
    const post = posts.find(post => +post.id === +id);
    if (post !== undefined) throw new Error("Post exists");
    const newPost = { id, title, content, date, creatorId };
    posts.push(newPost);
    return newPost;
};
export const updatePost = (parent, { id, title, content, date, creatorId }, context, info) => {
    let newPost = posts.find(post => +post.id === +id);
    if (newPost === undefined) throw new Error("Post not found.");
    newPost.title = title;
    newPost.content = content;
    newPost.date = date;

    return newPost;
};
export const deletePost = (parent, { id }, context, info) => {
    const postIndex = posts.findIndex(post => +post.id === +id);
    if (postIndex === -1) throw new Error("Post not found.");
    const deletedPosts = posts.splice(postIndex, 1);
    return deletedPosts[0];
};