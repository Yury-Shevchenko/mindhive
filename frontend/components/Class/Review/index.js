import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';

const REVIEW_CLASS_QUERY = gql`
  query REVIEW_CLASS_QUERY($id: ID!) {
    class(where: { id: $id }) {
      id
      title
      description
      creator {
        id
        username
      }
      createdAt
      students {
        id
        username
      }
    }
  }
`;

class ReviewClass extends Component {
  render() {
    return (
      <Query query={REVIEW_CLASS_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          console.log('data', data);
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.class) return <p>No class found for {this.props.id}</p>;
          const schoolclass = data.class;
          return (
            <div>
              <Head>
                <title>mindHIVE | {schoolclass.title}</title>
              </Head>
              <h2>{schoolclass.title}</h2>
              <p>{schoolclass.description}</p>
              <p>This class is created by {schoolclass.creator.username}.</p>
              <p>Created {schoolclass.createdAt}.</p>
              <h3>Students of this class</h3>
              <ul>
                {schoolclass.students.map(student => (
                  <div key={student.id}>{student.username}</div>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ReviewClass;
