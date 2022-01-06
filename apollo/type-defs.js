import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Todo {
    id: ID!
    task: String!
    done: Boolean
  }

  type Query {
    list: [Todo]
  }

  type Mutation {
    createTodo(task: String!): Todo
    toggleTodo(id: ID!): String
    deleteTodo(id: ID!): String
  }
`;
