import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';

const SINGLE_EXPERIMENT_QUERY = gql`
  query SINGLE_EXPERIMENT_QUERY($id: ID!){
    experiment(where: {id: $id}) {
      id
      title
      description
    }
  }
`

const UPDATE_EXPERIMENT = gql`
  mutation UPDATE_EXPERIMENT(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateExperiment(
      id: $id
      title: $title
      description: $description
    ) {
      id
      title
      description
    }
  }
`;

class UpdateExperiment extends Component {

  state = {}

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value
    })
  }

  updateExperiment = async (e, updateExperimentMutation) => {
    e.preventDefault();
    console.log('updating experiment', this.state, this.props.id);
    const res = await updateExperimentMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    })
  }

  render() {
    return (
      <Query query={SINGLE_EXPERIMENT_QUERY} variables={{id: this.props.id}}>
        { ({data, loading}) => {
          if(loading) return <p>Loading ... </p>
          if(!data || !data.experiment) return <p>No experiment found for id {this.props.id}</p>
          return(
            <Mutation
              mutation={ UPDATE_EXPERIMENT }
              variables={this.state}
            >
              { (updateExperiment, {loading, error}) => (
                <SignForm onSubmit={e => this.updateExperiment(e, updateExperiment)}
                  >
                  <h2>Edit the experiment</h2>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        defaultValue={data.experiment.title}
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
                        defaultValue={data.experiment.description}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                    <button type="submit">Sav{loading? 'ing' : 'e'} changes</button>
                  </fieldset>
                </SignForm>
              )}
            </Mutation>
          )
        }}
      </Query>
    );
  }

}

export default UpdateExperiment;
export { UPDATE_EXPERIMENT };
