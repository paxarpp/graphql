import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const styleContent = {
    border: '1px solid grey',
    marginBottom: '10px',
    padding: '10px',
    width: '300px'
}

class PostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: null
        }
    }

    handlerSelectPost = (id, creatorId) => () => {
        const query = gql`{
            post(id: ${id}) {
                id
                title
                content
                date
            }
            user(id: ${creatorId}) {
                name
            }
        }`;
        this.setState({query});
    }

    clearPost = () => {
        this.setState({query: ''});
    }

    render() {
        const {query} = this.state;
        return (  
            <div>
                <Query
                    query={
                        gql`{
                            posts {
                                id
                                title
                                creatorId
                            }
                        }`}>
                {
                    ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
            
                    return (
                        data.posts &&
                        data.posts.map(({ title, id, creatorId }) => (
                            <div key={`post-${id}`} onClick={this.handlerSelectPost(id, creatorId)} style={styleContent}>
                                <p>
                                {title}
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
                                data.post &&
                                    <div onClick={this.clearPost} style={styleContent}>
                                        <p>
                                            {data.post.title}
                                        </p>
                                        <p>
                                            {data.post.content}
                                        </p>
                                        <p>
                                            {data.post.date}
                                        </p>
                                        <p>
                                            {data.user.name}
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

export default PostsList;