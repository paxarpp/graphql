import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_POSTS, SELECTED_POST } from './constant';
import { Post } from './Post';
import { Posts } from './Posts';

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPostId: null,
    }
  }

  handlerSelectPost = (id) => () => {
    const { selectedPostId } = this.state;
    if (selectedPostId === id) {
      this.clearPost();
    } else {
      this.setState({ selectedPostId: id });
    }
  }

  clearPost = () => {
    this.setState({ selectedPostId: null });
  }

  render() {
    const { selectedPostId } = this.state;
    return (
      <div>
        <Query query={GET_POSTS}>
          {(props) => <Posts {...props} handlerSelectPost={this.handlerSelectPost}/>}
        </Query>
        {
          selectedPostId &&
          <Query query={SELECTED_POST(selectedPostId)}>
            {(props) => <Post {...props} clearPost={this.clearPost} />}
          </Query>
        }
      </div>
    )
  }
}

export default PostsList;