import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { List } from './List';
import { User } from './User';
import { GET_USER } from  './constant';

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUserId: null,
      query: null
    }
  }

  selectUser = (id) => gql`{
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
}`

  handlerSelectUser = (id) => () => {
    if (this.state.selectedUserId === id) {
      this.clearUser();
    } else {
      const query = this.selectUser(id);
      this.setState({ query, selectedUserId: id });
    }
  }

  clearUser = () => {
    this.setState({ query: null, selectedUserId: null });
  }

  render() {
    const { query } = this.state;
    return (
      <div>
        <Query query={GET_USER}>
          {(props) => <List {...props} handlerSelectUser={this.handlerSelectUser} />}
        </Query>

        {
          query &&
          <Query query={query}>
            {(props) => <User {...props} clearUser={this.clearUser}/>}
          </Query>
        }
      </div>
    )
  }
}

export default UsersList;