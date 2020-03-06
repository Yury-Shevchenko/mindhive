import EmailLogin from '../components/Login/Email/index';
import InviteLogin from '../components/Login/Invite/index';
import Page from '../components/Page/index';

const LoginPage = props => (
  <Page>
    <EmailLogin />
    <InviteLogin />
  </Page>
);

export default LoginPage;
