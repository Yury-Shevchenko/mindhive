import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
import {
  LOCAL_STATE_QUERY,
  TOGGLE_DASHBOARD_MUTATION,
} from '../components/Dashboard/index';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          // toggle dashboard
          toggleDashboard(_, variables, { cache }) {
            // read the value from the cache
            const { dashboardOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            console.log('dashboardOpen', dashboardOpen);
            const data = {
              data: { dashboardOpen: !dashboardOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        dashboardOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
