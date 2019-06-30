import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_POSTS, SELECTED_POST } from './constant';
import { Post } from './Post';
import { Posts } from './Posts';

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPost: null,
    }
  }

  handlerSelectPost = (selectedPostData) => () => {
    const { selectedPost } = this.state;
    if (selectedPost && selectedPost.id === selectedPostData.id) {
      this.clearPost();
    } else {
      this.setState({ selectedPost: selectedPostData });
    }
  }

  clearPost = () => {
    this.setState({ selectedPost: null });
  }

  render() {
    const { selectedPost } = this.state;
    return (
      <div>
        <Query query={GET_POSTS}>
          {(props) => <Posts {...props} handlerSelectPost={this.handlerSelectPost}/>}
        </Query>
        {
          selectedPost &&
          <Query query={SELECTED_POST(selectedPost)}>
            {(props) => <Post {...props} clearPost={this.clearPost} />}
          </Query>
        }
      </div>
    )
  }
}

export default PostsList;