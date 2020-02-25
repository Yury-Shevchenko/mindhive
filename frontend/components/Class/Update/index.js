import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';

const SINGLE_CLASS_QUERY = gql`
  query SINGLE_CLASS_QUERY($id: ID!) {
    class(where: { id: $id }) {
      id
      title
      description
      image
      largeImage
    }
  }
`;

const UPDATE_CLASS = gql`
  mutation UPDATE_CLASS(
    $id: ID!
    $title: String
    $description: String
    $image: String
    $largeImage: String
  ) {
    updateClass(
      id: $id
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      description
    }
  }
`;

class UpdateClass extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  updateClass = async (e, updateClassMutation) => {
    e.preventDefault();
    console.log('updating class', this.state, this.props.id);
    const res = await updateClassMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  // method for uploading images
  uploadImage = async e => {
    console.log('uploading image');
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'mindhive');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    console.log('file', file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    return (
      <Query query={SINGLE_CLASS_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.class)
            return <p>No class found for id {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_CLASS} variables={this.state}>
              {(updateClass, { loading, error }) => (
                <SignForm onSubmit={e => this.updateClass(e, updateClass)}>
                  <h2>Edit the class</h2>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="image">
                      Image
                      <input
                        type="file"
                        id="image"
                        name="image"
                        placeholder="Upload an image"
                        onChange={this.uploadImage}
                      />
                      {(this.state.image || data.class.image) && (
                        <img
                          src={this.state.image || data.class.image}
                          width="200"
                          alt="Upload preview"
                        />
                      )}
                    </label>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        defaultValue={data.class.title}
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
                        defaultValue={data.class.description}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? 'ing' : 'e'} changes
                    </button>
                  </fieldset>
                </SignForm>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateClass;
export { UPDATE_CLASS };
