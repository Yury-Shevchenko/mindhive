import Head from 'next/head';
import { Component } from 'react';
import { attributes, react as HomeContent } from '../../content/home.md';
import InviteLogin from '../Login/Invite/onboarding';

class Onboarding extends Component {
  render() {
    const { title, links } = attributes;
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <article>
          <h1>{title}</h1>
          <HomeContent />
          <InviteLogin />
        </article>
      </>
    );
  }
}

export default Onboarding;

// <h2>Links</h2>
// <ul>
//   {links.map((link, k) => (
//     <li key={k}>
//       <h2>{link.name}</h2>
//       <p>{link.description}</p>
//     </li>
//   ))}
// </ul>
