export interface ToDoItem {
  id: number;
  title: string;
  done: boolean;
}

export interface ToDoCreateInput {
  title: string;
}

export interface ToDoUpdateInput {
  title?: string;
  done?: boolean;
}
