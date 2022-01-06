import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { todoGQL } from '../src/gqls';
import { CreateTaskBar, TaskBar } from '../src/component';
import useStyle from '../src/styles/pages';
import { initializeApollo } from '../apollo/client';

function Index() {
  const { loading, error, data } = useQuery(todoGQL.TODO_QUERY);
  const classes = useStyle();

  const renderList = useMemo(
    () =>
      loading ? (
        <CircularProgress />
      ) : (
        data.list.map((todo) => (
          <ListItem key={`todo-${todo.id}`}>
            <TaskBar todo={todo} />
          </ListItem>
        ))
      ),
    [loading, data]
  );

  if (error) return null;

  return (
    <Container maxWidth="md" className={classes.container}>
      <List subheader={<ListSubheader component="p">Todo list</ListSubheader>}>
        {renderList}
        <ListItem>
          <CreateTaskBar />
        </ListItem>
      </List>
    </Container>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default Index;
