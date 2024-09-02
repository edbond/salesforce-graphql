export class Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  
    constructor(title: string, completed: boolean) {
      this.id = Date.now().toString();
      this.title = title;
      this.completed = completed;
      this.createdAt = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
    }
  }