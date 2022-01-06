import { v4 as uuid } from "uuid";

const todoList = [];

export const resolvers = {
  Query: {
    list() {
      return todoList;
    }
  },
  Mutation: {
    createTodo(_, { task }) {
      const item = { id: uuid(), task, done: false };
      todoList.push(item);
      return item;
    },
    toggleTodo(_, { id }) {
      const item = todoList.find((i) => i.id === id);
      if (item) {
        item.done = !item.done;
        return `${id} toggled`;
      }
      console.error(`${id} does not exist`);
    },
    deleteTodo(_, { id }) {
      const target = todoList.findIndex((i) => i.id === id);
      if (target !== -1) {
        todoList.splice(target, 1);
        return `${id} deleted`;
      }
      console.error(`${id} does not exist`);
    }
  }
};
