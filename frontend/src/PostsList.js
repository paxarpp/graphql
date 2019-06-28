import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { GET_POSTS } from './constant';
import { Post } from './Post';
import { Posts } from './Posts';

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPostId: null,
      query: null
    }
  }

  selectPost = (id, creatorId) => gql`{
    post(id: ${id}) {
        id
        title
        content
        date
    }
    user(id: ${creatorId}) {
        name
    }
  }`

  handlerSelectPost = (id, creatorId) => () => {
    if (this.state.selectedPostId === id) {
      this.clearPost();
    } else {
      const query = this.selectPost(id, creatorId);
      this.setState({ query, selectedPostId: id });
    }
  }

  clearPost = () => {
    this.setState({ query: '', selectedPostId: null });
  }

  render() {
    const { query } = this.state;
    return (
      <div>
        <Query query={GET_POSTS}>
          {(props) => <Posts {...props} handlerSelectPost={this.handlerSelectPost}/>}
        </Query>
        {
          query &&
          <Query query={query}>
            {(props) => <Post {...props} clearPost={this.clearPost} />}
          </Query>
        }
      </div>
    )
  }
}

export default PostsList;