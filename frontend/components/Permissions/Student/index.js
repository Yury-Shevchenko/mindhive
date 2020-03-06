import { Query } from 'react-apollo';
import {
  CURRENT_USER_QUERY,
  CURRENT_USER_RESULTS_QUERY,
} from '../../User/index';

export const ContainerOnlyForStudents = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading ... </p>;
      console.log('data', data);
      if (!data.me || !data.me.permissions.includes('STUDENT')) {
        return <div></div>;
      }
      return props.children;
    }}
  </Query>
);

export const ContainerOnlyForStudentsInClass = props => (
  <Query query={CURRENT_USER_RESULTS_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading ... </p>;
      console.log('data', data);
      if (
        !data.me ||
        !data.me.permissions.includes('STUDENT') ||
        !data.me.studentIn.map(i => i.id).includes(props.id)
      ) {
        return <div></div>;
      }
      return props.children;
    }}
  </Query>
);

export const ContainerOnlyForStudentsOutClass = props => (
  <Query query={CURRENT_USER_RESULTS_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading ... </p>;
      console.log('data', data);
      if (
        !data.me ||
        !data.me.permissions.includes('STUDENT') ||
        data.me.studentIn.map(i => i.id).includes(props.id)
      ) {
        return <div></div>;
      }
      return props.children;
    }}
  </Query>
);

export const PageOnlyForStudents = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading ... </p>;
      console.log('data', data);
      if (!data.me || !data.me.permissions.includes('STUDENT')) {
        return (
          <div>
            <p>Please sign in as a student in order to do that</p>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);
