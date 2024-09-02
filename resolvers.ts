import { Todo } from './models/Todo';
import { db } from './db';

export const resolvers = {
  Query: {
    todo: (_: unknown, args: { first?: number; after?: string; last?: number; before?: string }) => {
      // Implement filtering, sorting, and pagination logic here
      const allTodos = db.todos;
      let filteredTodos = allTodos;

      // Apply cursor-based pagination
      if (args.after) {
        const afterIndex = allTodos.findIndex(todo => todo.id === args.after);
        filteredTodos = filteredTodos.slice(afterIndex + 1);
      } else if (args.before) {
        const beforeIndex = allTodos.findIndex(todo => todo.id === args.before);
        filteredTodos = filteredTodos.slice(0, beforeIndex);
      }

      // Apply limit
      if (args.first) {
        filteredTodos = filteredTodos.slice(0, args.first);
      } else if (args.last) {
        filteredTodos = filteredTodos.slice(-args.last);
      }

      return {
        edges: filteredTodos.map(todo => ({ node: todo, cursor: todo.id })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: db.todos[0]?.id,
          endCursor: db.todos[db.todos.length - 1]?.id,
        },
      };
    },
    node: (_: unknown, { id }: { id: string }) => {
      return db.todos.find(todo => todo.id === id);
    },
  },
  Mutation: {
    create_Todo: (_: unknown, { input }: { input: { title: string; completed: boolean } }) => {
      const newTodo = new Todo(input.title, input.completed);
      db.todos.push(newTodo);
      return newTodo;
    },
    delete_Todo: (_: any, { id }: any) => {
      const index = db.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        const [deletedTodo] = db.todos.splice(index, 1);
        return deletedTodo;
      }
      return null;
    },
    update_Todo: (_: any, { input }: any) => {
      const todo = db.todos.find(todo => todo.id === input.id);
      if (todo) {
        Object.assign(todo, input);
        todo.updatedAt = new Date().toISOString();
        return todo;
      }
      return null;
    },
  },
  Node: {
    __resolveType(obj: any) {
      if (obj instanceof Todo) {
        return 'Todo';
      }
      return null;
    },
  },
};