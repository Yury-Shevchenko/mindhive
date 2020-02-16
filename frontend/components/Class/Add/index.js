import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';

const CREATE_NEW_CLASS = gql`
  mutation CREATE_NEW_CLASS($title: String!, $description: String) {
    createClass(title: $title, description: $description) {
      id
    }
  }
`;

class AddClass extends Component {
  state = {
    title: 'Test title for the class',
    description: 'Test description of the class',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_NEW_CLASS} variables={this.state}>
        {(createClass, { loading, error }) => (
          <SignForm
            onSubmit={async e => {
              e.preventDefault();
              const res = await createClass();
              // change the page
              Router.push({
                pathname: '/class',
                query: { id: res.data.createClass.id },
              });
            }}
          >
            <h2>Add a new class</h2>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default AddClass;
