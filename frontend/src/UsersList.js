import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const styleContent = {
    border: '1px solid grey',
    marginBottom: '10px',
    padding: '10px',
    width: '300px',
    background: '#d6d6d6'
}
const stylePosition = {
    position: 'absolute',
    top: '10%',
    left: '50%',
}
const styleUser = {
    ...styleContent,
    ...stylePosition,
}

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedUserId: null,
            query: null
        }
    }

    handlerSelectUser = (id) => () => {
        if (this.state.selectedUserId === id) {
            this.clearUser();
        } else {
            const query = gql`{
                user(id: ${id}) {
                    id
                    name
                    email
                    age
                }
                posts(creatorId: ${id}) {
                    title
                    content
                    id
                }
            }`;
            this.setState({query, selectedUserId: id});
        }
    }

    clearUser = () => {
        this.setState({query: '', selectedUserId: null});
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
                            if (loading) return <p style={stylePosition}>Loading...</p>;
                            if (error) return <p style={stylePosition}>Error</p>;
                    
                            return (
                                data.user &&
                                    <div onClick={this.clearUser} style={styleUser}>
                                        <p>
                                            {data.user.name}
                                        </p>
                                        <p>
                                            {data.user.email}
                                        </p>
                                        <p>
                                            {data.user.age}
                                        </p>
                                        {
                                            data.posts.map(({id, title, content}) => {
                                                return (
                                                    <p key={`idpost-${id}`}>{title} <span>{content}</span></p>
                                                )
                                            })
                                        }
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