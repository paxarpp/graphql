import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { List } from './List';
import { User } from './User';
import { GET_USER, SELECTED_USER } from  './constant';

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUserId: null,
    }
  }

  handlerSelectUser = (id) => () => {
    if (this.state.selectedUserId === id) {
      this.clearUser();
    } else {
      this.setState({ selectedUserId: id });
    }
  }

  clearUser = () => {
    this.setState({ selectedUserId: null });
  }

  render() {
    const { selectedUserId } = this.state;
    return (
      <div>
        <Query query={GET_USER}>
          {(props) => <List {...props} handlerSelectUser={this.handlerSelectUser} />}
        </Query>

        {
          selectedUserId &&
          <Query query={SELECTED_USER(selectedUserId)}>
            {(props) => <User {...props} clearUser={this.clearUser}/>}
          </Query>
        }
      </div>
    )
  }
}

export default UsersList;