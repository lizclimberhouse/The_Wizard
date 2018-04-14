//long wayf or the final const here
//const dispatch = this.props;
//const tag = this.props.match.params.tagimport React from 'react';
import React from 'react';
import axios from 'axios';
import { Card, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUsersByTag } from '../actions/likeUsers';
import UserCard from './UserCard';
import InfiniteScroll from 'react-infinite-scroller';

// to scroll an elememt, the elemet needs a top level that has a height.
const styles = {
  container: {
    height: '700px',
    overflow: 'auto',
  }
}

class TagList extends React.Component {
  state = { page: 1 }

  componentDidMount() {
    //const dispatch = this.props;
    //const tag = this.props.match.params.tag
    // const { dispatch, match: { params: { tag } }} = this.props;
    // dispatch(getUsersByTag(tag))
    this.loadUsers()
  }

  componentWillReceiveProps(nextProps) {
    // if the amount of user that I have is differnt then the current amoutn of users then chagne page number
    if(nextProps.users.length !== this.props.users.length)
    this.setState({ page: this.state.page + 1 })
  }

  loadUsers = () => {
    const { page } = this.state;
    const { dispatch, match: { params: { tag } }} = this.props;
    dispatch(getUsersByTag(tag, page))
  }

  render() {
    const { users, total_pages } = this.props;
    const { page } = this.state;
    return (
      <div>
        <InfiniteScroll
          loadMore={this.loadUsers}
          hasMore={page < total_pages}
          loader={<div className="loader">Loading ...</div>}
          useWindow={true}
        >
          <Card.Group itemsPerRow={3}>
            { users.map( user => <UserCard key={user.id} user={user} /> ) }
          </Card.Group>
        </InfiniteScroll>
      </div>
    )
  }
}

//mapStateToProps is pulling 
// mapping the redux state at the begining to props so you can use this.props. so that the this.props is the state of the redux store before you've editing it in this commponent.
const mapStateToProps = (state) => {
  const { users, total_pages } = state.likeUsers
  return { users, total_pages }
}

export default connect(mapStateToProps)(TagList)