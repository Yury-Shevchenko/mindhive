import Reset from '../components/Reset/index'
import Page from '../components/Page/index';

const ResetPage = props => (
  <Page>
    <Reset resetToken={props.query.resetToken} />
  </Page>
);

export default ResetPage;
