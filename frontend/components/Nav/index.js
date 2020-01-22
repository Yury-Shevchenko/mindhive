import Link from 'next/link';
import NavStyles from './styles';
import User from '../User/index';
import Signout from '../Signout/index';

const Nav = () => (

    <User>
      { ({ data: { me } }) => (
        <NavStyles>

          <Link href="/bank">
            <a>Experiments</a>
          </Link>

          <Link href="/journal">
              <a>Journal</a>
          </Link>

          <Link href="/resources">
              <a>Recources</a>
          </Link>

          {me && (
            <>
              <Link href="/">
                <a>Dashboard</a>
              </Link>
              <Signout />
            </>
          )}

          {!me && (
            <>
              <Link href="/signup">
                  <a>Signup</a>
              </Link>

              <Link href="/login">
                  <a>Login</a>
              </Link>
            </>
          )}

        </NavStyles>
      )}
    </User>
)

export default Nav;
