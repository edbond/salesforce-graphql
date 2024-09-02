import { Todo } from './models/Todo';

export const db = {
  todos: [
    new Todo('Buy groceries', false),
    new Todo('Finish project', false),
    new Todo('Call mom', true),
  ],
};