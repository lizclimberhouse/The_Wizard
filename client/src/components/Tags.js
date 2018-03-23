import React from 'react';
import { Divider, List, Header } from 'semantic-ui-react';
import TagForm from './TagForm';
import { getTags, deleteTag } from '../actions/tags';
import { connect } from 'react-redux';
import LikeUsers from './LikeUsers';
import Tag from './Tag';

class Tags extends React.Component {

  componentDidMount() {
    this.props.dispatch(getTags())
  }
  //don't use componentWillMount ever. if the data will take time to load, use pagination. Dont use componentWillMount becuase something is to fast and your data may never load...this is since a certain upgrade.

  render() {
    const { tags, dispatch } = this.props; //added dispatch when we added the deleteTag functoin for the delete icon thingy. Only need to add it here to defactor. otherwise on the onClick it would be this.props.dispatch(dele...())
    return (
      <div>
        <TagForm />
        { tags.length > 0 && 
          <div>
            <Header as="h3" textAlign="center">
              Tags
            </Header>
            <List divided horizontal>
              { tags.map( tag => 
                  <Tag key={tag.id} tag={tag} deletable={true} deleteAction={ () => this.props.dispatch(deleteTag(tag.id)) } />
                )
              }
            </List>
          </div> 
        }
        {/* // dont render anything under the form unless we have tags */}
        <LikeUsers />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { tags: state.tags }
}

export default connect(mapStateToProps)(Tags);

// 3 steps:
// getting stuff into redxus store
// ...
// ...