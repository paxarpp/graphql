import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		users(start: Int, offset: Int): [User!]!
		user(id: ID!): User!
		post(id: ID!): Post!
		posts(creatorId: ID): [Post!]!
	}
	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post]
	}
	type Post {
		id: ID!
		title: String!
		content: String!
		date: String!
		creatorId: Int!
	}
	type Mutation {
		createUser(id: ID!, name: String!, email: String!, age: Int): User!
		updateUser(id: ID!, name: String, email: String, age: Int): User!
		deleteUser(id: ID!): User!
		createPost(id: ID!, title: String!, content: String!, date: String!, creatorId: Int!): Post!
		updatePost(id: ID!, title: String, content: String, date: String, creatorId: Int): Post!
		deletePost(id: ID!): Post!
	}
`;

export default typeDefs;