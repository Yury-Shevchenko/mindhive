import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';

const CREATE_NEW_CLASS = gql`
  mutation CREATE_NEW_CLASS(
    $title: String!
    $description: String
    $image: String
    $largeImage: String
  ) {
    createClass(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class AddClass extends Component {
  state = {
    title: 'Test title for the class',
    description: 'Test description of the class',
    image: 'nothing',
    largeImage: 'largenothing',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
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
              <label htmlFor="image">
                Image
                <input
                  type="file"
                  id="image"
                  name="image"
                  placeholder="Upload an image"
                  onChange={this.uploadImage}
                />
                {this.state.image && (
                  <img
                    src={this.state.image}
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
