import { Task } from './task.interface';

export interface Functionality {
  id: number;
  projectId: number;
  name: string;
  description: string;
  priority: string;
  project: string;
  dateAdded: string;
  owner: string;
  status: string;
  tasks: Task[];
}
