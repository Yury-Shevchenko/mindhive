import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from '../Nav/index';
import Dashboard from '../Dashboard/index';

import { Logo, StyledHeader } from './styles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="">
          <a>mindHIVE</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Placeholder</p>
    </div>
    <Dashboard />
  </StyledHeader>
);

export default Header;
