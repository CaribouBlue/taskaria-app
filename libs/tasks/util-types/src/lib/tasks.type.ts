export interface Task {
  UserId: string;
  TaskId: string;
}

export type Tasks = Task[];

export type NewTask = Omit<Task, 'TaskId'>;
