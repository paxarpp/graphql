import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		users(start: Int, offset: Int): [User!]!
		user(id: ID!): User!
		post(id: ID!): Post!
		posts(creatorId: ID): [Post!]!
		creator: User
	}
	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post]!
	}
	type Post {
		id: ID!
		title: String!
		content: String!
		date: String!
		creatorId: Int!
		creator: User!
	}
	input UserInput {
		name: String!
		email: String!
		age: Int
	}
	input UserUpdateInput {
		id: ID!
		name: String
		email: String
		age: Int
	}
	input PostInput {
		title: String!
		content: String!
		date: String!
		creatorId: Int!
	}
	input PostUpdateInput {
		id: ID!
		title: String
		content: String
	}
	type Mutation {
		createUser(user: UserInput!): User!
		updateUser(user: UserUpdateInput!): User!
		deleteUser(id: ID!): User!
		createPost(post: PostInput!): Post!
		updatePost(post: PostUpdateInput!): Post!
		deletePost(id: ID!): Post!
	}
`;

export default typeDefs;