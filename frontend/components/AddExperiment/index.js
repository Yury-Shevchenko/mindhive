import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';

const CREATE_NEW_EXPERIMENT = gql`
  mutation CREATE_NEW_EXPERIMENT(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createExperiment(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class AddExperiment extends Component {
  state = {
    title: 'Test title',
    description: 'Test description',
    image: 'Test image',
    largeImage: 'Test large image',
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
      <Mutation mutation={CREATE_NEW_EXPERIMENT} variables={this.state}>
        {(createExperiment, { loading, error }) => (
          <SignForm
            onSubmit={async e => {
              e.preventDefault();
              const res = await createExperiment();
              // change the page
              Router.push({
                pathname: '/exp',
                query: { id: res.data.createExperiment.id },
              });
            }}
          >
            <h2>Add an experiment</h2>
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

export default AddExperiment;
export { CREATE_NEW_EXPERIMENT };
