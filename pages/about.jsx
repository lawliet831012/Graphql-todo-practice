import React from 'react';
import Link from '../src/component/Link';

export default function About() {
  return (
    <div>
      This is a static page goto{' '}
      <Link href="/">
        <a>dynamic</a>
      </Link>{' '}
      page.
    </div>
  );
}
