export interface Task {
  userId: string;
  taskId: string;
  summary: string;
}

export type Tasks = Task[];

export type NewTask = Omit<Task, 'taskId'>;
