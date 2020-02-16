import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ClassCard from '../Card/index';
import { Center, List } from '../../Styles/Cards.js';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_CLASSES_QUERY = gql`
  query ALL_CLASSES_QUERY {
    classes {
      id
      title
      description
      creator {
        username
      }
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class Classes extends Component {
  render() {
    return (
      <Center>
        <h1>Classes</h1>
        <Query query={ALL_CLASSES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.classes.map(schoolclass => (
                  <ClassCard schoolclass={schoolclass} key={schoolclass.id} />
                ))}
              </List>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Classes;
export { ALL_CLASSES_QUERY };
