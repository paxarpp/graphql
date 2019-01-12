import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const UsersList = () => (
    <Query
        query={
            gql`{
                users {
                    id
                    name
                    email
                    age
                }
            }`
        }
    >
    {
        ({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.users.map(({ email, name, id, age }) => (
            <div key={id}>
                <p>
                {name}
                </p>
                <p>
                {`возраст: ${age}`}
                </p>
                <p> {`почта: ${email}`}</p>
            </div>
        ));
        }
    }
    </Query>
);

export default UsersList;