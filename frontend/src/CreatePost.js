import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
        }
    }
    inputPost = (e) => {
        const value = e.currentTarget.value;
        const type = e.currentTarget.dataset.type;
        this.setState({[type]: value});
    }
    
    sendPost = (createPost) => () => {
        const { title, content } = this.state;
        createPost({
            variables: {
                post: {
                    title,
                    content,
                    date: new Date().getTime().toString(),
                    creatorId: 1,
                }
            }
        });
        this.setState({
            title: '',
            content: '',
        });
    }

    render() {
        const { title, content } = this.state;
        return (  
            <Mutation mutation={gql`
            mutation CreatePost($post: PostInput!) {
                createPost(post: $post) {
                        id
                        title
                        content
                        date
                        creatorId
                    }
                }
        `}>
                {(createPost, { loading, error }) => (
                    <div>
                        <input type="text" data-type="title" onChange={this.inputPost} value={title}/>
                        <input type="text" data-type="content" onChange={this.inputPost} value={content}/>
                        <button onClick={this.sendPost(createPost)}>
                            опубликовать
                        </button>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default CreatePost;