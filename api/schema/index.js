import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Query {
		users(last: Int): [User!]!
		user(id: ID!): User!
	}
	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
	}
	type Mutation {
		createUser(id: ID!, name: String!, email: String!, age: Int): User!
		updateUser(id: ID!, name: String, email: String, age: Int): User!
		deleteUser(id: ID!): User!
	}
`;

export default typeDefs;