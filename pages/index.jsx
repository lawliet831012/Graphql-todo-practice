import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Link from '../src/component/Link';
import { initializeApollo } from '../apollo/client';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`;

function Index() {
  const {
    data: { viewer }
  } = useQuery(ViewerQuery);

  return (
    <div>
      You&apos;re signed in as {viewer.name} and you&apos;re {viewer.status}{' '}
      goto{' '}
      <Link href="/about">
        <a>static</a>
      </Link>{' '}
      page.
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerQuery
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default Index;
