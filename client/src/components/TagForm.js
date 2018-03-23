import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addTag } from '../actions/tags';

class TagForm extends React.Component {
  state = { name: '' }

  handleChange = (e) => {
    const { value } = e.target;
    const name = value.toLowerCase().replace(' ', '')
    this.setState({ name })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const tag = { name: this.state.name }
    this.props.dispatch(addTag(tag))
    this.setState({ name: '' })
    // currently we dont know how this is going to work but we're building it as though we do.
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          onChange={this.handleChange}
          value={this.state.name}
          required
          placeholder="Add Tag"
        />
      </Form>
    )
  }
}

export default connect()(TagForm);