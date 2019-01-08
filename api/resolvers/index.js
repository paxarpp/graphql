import { users } from "../mockData/db";
import { posts } from "../mockData/db";

const resolvers = {
	Query: {
		post: (parent, { id }, context, info) => {
			const post = posts.find(post => +post.id === +id);
			if (post === undefined) throw new Error("Post not found.");
			return post;
		},
		
		posts: (parent, { creatorId }, context, info) => {
			const _posts = posts.filter(post => +post.creatorId === +creatorId);
			return _posts;
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
		createUser: (parent, { id, name, email, age }, context, info) => {
			const user = users.find(user => +user.id === +id);
			if (user !== undefined) throw new Error("User exists");
			const newUser = { id, name, email, age };
			users.push(newUser);
			return newUser;
		},
		updateUser: (parent, { id, name, email, age }, context, info) => {
			let newUser = users.find(user => +user.id === +id);
			if (newUser === undefined) throw new Error("User not found.");
			newUser.name = name;
			newUser.email = email;
			newUser.age = age;
			return newUser;
		},
		deleteUser: (parent, { id }, context, info) => {
			const userIndex = users.findIndex(user => +user.id === +id);
			if (userIndex === -1) throw new Error("User not found.");
			const deletedUsers = users.splice(userIndex, 1);
			return deletedUsers[0];
		},
		createPost: (parent, { id, title, content, date, creatorId }, context, info) => {
			const post = posts.find(post => +post.id === +id);
			if (post !== undefined) throw new Error("Post exists");
			const newPost = { id, title, content, date, creatorId };
			posts.push(newPost);
			return newPost;
		},
		updatePost: (parent, { id, title, content, date, creatorId }, context, info) => {
			let newPost = posts.find(post => +post.id === +id);
			if (newPost === undefined) throw new Error("Post not found.");
			newPost.title = title;
			newPost.content = content;
			newPost.date = date;
	
			return newPost;
		},
		deletePost: (parent, { id }, context, info) => {
			const postIndex = posts.findIndex(post => +post.id === +id);
			if (postIndex === -1) throw new Error("Post not found.");
			const deletedPosts = posts.splice(postIndex, 1);
			return deletedPosts[0];
		}
	}
};

export default resolvers;
