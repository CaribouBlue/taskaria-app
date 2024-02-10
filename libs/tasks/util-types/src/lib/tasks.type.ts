export interface Task {
  userId: string;
  taskId: string;
  summary: string;
  isCompleted: boolean;
  createdTimestamp: number;
}

export type Tasks = Task[];

export type NewTask = Omit<Task, 'taskId' | 'isCompleted'>;
