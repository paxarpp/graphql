import React from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import UsersList from  './UsersList';
import PostsList from  './PostsList';
import CreatePost from  './CreatePost';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});


const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app</h2>
            <UsersList />
            <PostsList />
            <CreatePost />
        </div>
    </ApolloProvider>
);

export default App;
