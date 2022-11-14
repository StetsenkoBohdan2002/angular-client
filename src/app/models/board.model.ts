export interface Board {
  _id: string;
  userId: string;
  todoColor:string;
  progressColor:string;
  doneColor:string;
  boardName: string;
  boardDesc: string;
  createdDate: string;
  tasks: {
    todo: number;
    progress: number;
    done: number;
  };
}
