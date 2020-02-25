import InviteSignup from '../../components/Sign/Invite/index';
import Page from '../../components/Page/index';

const InviteSignupPage = ({ query }) => (
  <Page>
    <InviteSignup invitedBy={query.id} />
  </Page>
);

export default InviteSignupPage;
