import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST, GET_POSTS } from './constant';

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
    this.setState({ [type]: value });
  }

  sendPost = (createPost) => () => {
    const { title, content } = this.state;
    createPost({
      variables: {
        post: {
          title,
          content,
          date: new Date().toDateString(),
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
      <Mutation mutation={CREATE_POST}
        update={(cache, { data: { createPost } }) => {
        const { posts } = cache.readQuery({ query: GET_POSTS });
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: posts.concat([createPost]) },
        });
      }}
        >
        {(createPost, { loading, error }) => (
          <div>
            <input type="text" data-type="title" onChange={this.inputPost} value={title} />
            <input type="text" data-type="content" onChange={this.inputPost} value={content} />
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