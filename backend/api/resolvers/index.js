import { users } from "../mockData/db";
import { posts } from "../mockData/db";
import * as usersMutation from "../Mutation/usersMutation";
import * as postsMutation from "../Mutation/postsMutation";

const USER_PER_PAGE = 10;

const resolvers = {
	Query: {
		post: (parent, { id }, context, info) => {
			const post = posts.find(post => +post.id === +id);
			if (post === undefined) throw new Error("Post not found.");
			return post;
		},
		posts: (parent, { creatorId }, context, info) => {
			if (!creatorId) return posts;
			return posts.filter(post => +post.creatorId === +creatorId);
		},
		user: (parent, { id }, context, info) => {
			const user = users.find(user => +user.id === +id);
			if (user === undefined) throw new Error("User not found.");
			return user;
		},
		users: (parent, { start, offset=USER_PER_PAGE }, context, info) => {
			const sum = +offset + +start;
			const end = sum > users.length ? users.length : sum;
			if (start && +start >= 0 && +start < users.length) return users.slice(start, end);
			return users;
		},
	},
	Mutation: {
		createUser: usersMutation.createUser,
		updateUser: usersMutation.updateUser,
		deleteUser: usersMutation.deleteUser,
		createPost: postsMutation.createPost,
		updatePost: postsMutation.updatePost,
		deletePost: postsMutation.deletePost
	},
	Post: {
		creator: ({ creatorId }, arg, context, info) => {
			const user = users.find(user => +user.id === +creatorId);
			return user;
		}
	},
	User: {
		posts: ({ id }, arg, context, info) => {
			const posts = posts.find(post => +post.creatorId === +id);
			return posts;
		}
	}
};

export default resolvers;
