export interface Task {
  userId: string;
  taskId: string;
  summary: string;
  isCompleted: boolean;
}

export type Tasks = Task[];

export type NewTask = Omit<Task, 'taskId' | 'isCompleted'>;
