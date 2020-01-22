import App, { Container } from 'next/app';
import Page from '../components/Page/index';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {

  // get initial props of pages and resolve queries and mutation before rendering the page
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
    }
    // exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp);
