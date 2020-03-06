import Reset from '../components/Reset/index';
import Page from '../components/Page/index';

const ResetPage = ({ query }) => (
  <Page>
    <Reset resetToken={query.resetToken} />
  </Page>
);

export default ResetPage;
