import Head from 'next/head';
import { Component } from 'react';
import { attributes, react as HomeContent } from '../../content/home.md';
import OnboardingSignupWithClassInvite from '../Sign/Invite/onboarding';

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
          <OnboardingSignupWithClassInvite />
        </article>
      </>
    );
  }
}

export default Onboarding;
