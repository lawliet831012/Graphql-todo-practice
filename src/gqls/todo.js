import gqlTag from 'graphql-tag';
import { gql } from '@apollo/client';

export const TODO_QUERY = gqlTag`
  query TodoQuery {
    list {
      id
      task
      done
    }
  }
`;

export const ADD_TODO = gql`
  mutation createTodo($task: String!) {
    createTodo(task: $task) {
      id
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const TOGGLE_TODO = gql`
  mutation toggleTodo($id: ID!) {
    toggleTodo(id: $id)
  }
`;
