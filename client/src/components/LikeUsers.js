// users and tags are going to come from the redux store
// line 9 - need to get teh users taht are liek me, so sub in an action that we'll write later.
// line 13 - then if the user doesn't have an image, we need to give them a default image. 

// class
// componentDidMount is where I should go get he users, but it only runs once at the beginning, so if I add a new tag, it wont reload teh users with that tag.
// therefroe: going to put teh stuff that I would normally do in componentDidMount happen in a differnt funciton  and call that function in componentDidMount.
// new function is called:
//   reload = () => 
// Also need componentWillReceiveProps(nextProps) // this will run everytime our props change. (each time we add or remove a tag) needs a check taht the props actually chagned...therefore us ethe if...

// render
// likeUsers.map into individual cards. with image =... src={image || defaultImage } /> <<this is the default image we set earlier.
// show this users tags in their card... tags.map into list insdie the card description.

// mapstatetoprops returns tags, likeUsers (new to the redux store)
// export connect(mapstatetoprops)(...)

import React from 'react';
import { connect } from 'react-redux';
import { 
  Card, 
  Divider, 
  List, 
  Image 
} from 'semantic-ui-react';
import { getLikeUsers } from '../actions/likeUsers';
import UserCard from './UserCard';

// dont need this bc of migratoin with default image
// const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class LikeUsers extends React.Component {
  componentDidMount() {
    this.reload();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags !== this.props.tags)
      this.reload()
  }

  reload = () => {
    this.props.dispatch(getLikeUsers())
  }

  render() {
    const { users } = this.props; // was likeUsers
    return (
      <Card.Group itemsPerRow={4}>
        { users.map( user =>  //was likeUsers
          <UserCard key={user.id} user={user} />
        )
      }
      </Card.Group>
    )
  }
}

const mapStateToProps = (state) => {
  const { users, total_pages } = state.likeUsers; // was just users
  return { 
    tags: state.tags,
    users, // was likeUsers: state.likeUsers,
    total_pages, 
  }
}

export default connect(mapStateToProps)(LikeUsers)