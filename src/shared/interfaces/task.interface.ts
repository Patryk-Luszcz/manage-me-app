export interface Task {
  id: number;
  name: string;
  description: string;
  priority: string;
  functionalityId: number;
  taskBelongToFunctionality: string;
  predictedExecutionTime: string;
  state: string;
  dateAdded: string;
  dateStart: string;
  dateEnd: string;
  assignedUsers: string[];
}
