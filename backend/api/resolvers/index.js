import { users } from "../mockData/db";
import { posts } from "../mockData/db";
import * as usersMutation from "../Mutation/usersMutation";
import * as postsMutation from "../Mutation/postsMutation";

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
		users: (parent, { last, first }, context, info) => {	
			if (last && +last > 0 && +last < users.length) return users.slice(-1 * +last);
			if (first && +first > 0 && +first < users.length) return users.slice(0, first);
			return users;
		}
	},
	Mutation: {
		createUser: usersMutation.createUser,
		updateUser: usersMutation.updateUser,
		deleteUser: usersMutation.deleteUser,
		createPost: postsMutation.createPost,
		updatePost: postsMutation.updatePost,
		deletePost: postsMutation.deletePost
	}
};

export default resolvers;
