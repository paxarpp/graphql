import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const styleContent = {
    border: '1px solid grey',
    marginBottom: '10px',
    padding: '10px',
    width: '300px'
}

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: null
        }
    }

    handlerSelectUser = (id) => () => {
        const query = gql`{
            user(id: ${id}) {
                id
                name
                email
                age
            }
        }`;
        this.setState({query});
    }

    clearUser = () => {
        this.setState({query: ''});
    }

    render() {
        const {query} = this.state;
        return (  
            <div>
                <Query
                    query={
                        gql`{
                            users {
                                id
                                name
                            }
                        }`}>
                {
                    ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
            
                    return (
                        data.users &&
                        data.users.map(({ name, id }) => (
                            <div key={id} onClick={this.handlerSelectUser(id)} style={styleContent}>
                                <p>
                                {name}
                                </p>
                            </div>
                        ))
                        ) 
                    }
                }
                </Query>

                {
                    query &&
                    <Query query={query}>
                        {
                            ({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error</p>;
                    
                            return (
                                data.user &&
                                    <div onClick={this.clearUser} style={styleContent}>
                                        <p>
                                            {data.user.name}
                                        </p>
                                        <p>
                                            {data.user.email}
                                        </p>
                                        <p>
                                            {data.user.age}
                                        </p>
                                    </div>
                                ) 
                            }
                        }
                    </Query>
                }
            </div>
        )
    }
}

export default UsersList;