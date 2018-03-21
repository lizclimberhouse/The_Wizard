import React from 'react';
import { Form, Grid, Image, Container, Divider, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

const Fragment = React.Fragment;

// might be harder to make a differnt url route form/page to edit user info if teh user info is coming through react in state.
// but its about the same to make a different route as a toggle form if the user data is in redux

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png'

class Profile extends React.Component {
  state = { editing: false, formValues: { name: '', email: '', gamertag: '' }, }
  // because the state for user info is inside of an object, we have to rethink the handleChang function

  componentDidMount() {
    const { user: { name, email, gamertag }} = this.props
    this.setState({ formValues: { name, email, gamertag } })
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing }
      // if your next state depends on this state better to use a function like above that the below option.
      // this.setState({ editing: !editing })
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    })
  }

  handleSubmit = (e) => {

  }

  profileView = () => {
    const { user } = this.props;
    return (
      <Fragment>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1">{user.name}</Header>
          <Header as="h1">{user.email}</Header>
          <Header as="h1">{user.gamertag || 'Internet Coward'}</Header>
          {/* the internet coward is the default value if nothing is entered, since its not required */}
        </Grid.Column>
      </Fragment>
    )
  }

  editView = () => {
    const { formValues: { name, email, gamertag } } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column>
          <Form.Input
            label="Name"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />
          {/* should be required if it was required on registration */}

          <Form.Input
            label="Email"
            name="email"
            value={email}
            type="email"
            required
            onChange={this.handleChange}
          />
          <Form.Input
            label="Gamertag"
            name="gamertag"
            value={gamertag}
            onChange={this.handleChange}
          />
          <Button>Update</Button>
        </Grid.Column>
      </Form>
    )
  }

  render() {
    const { editing } = this.state;
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            { editing ? this.editView() : this.profileView() }
            <Grid.Column>
              <Button onClick={this.toggleEdit}>
                {/* because not passing anythign in we don't need to do toggleEdit() */}
                { editing ? 'Cancel' : 'Edit' }
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )

  }

}

//state is redux store (props is implied, doesn't need to be stated here)
const mapStateToProps = (state, props) => {
  return { user: state.user}
}

export default connect(mapStateToProps)(Profile);