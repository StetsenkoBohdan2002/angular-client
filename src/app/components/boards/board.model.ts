export interface Board {
  _id: String;
  userId: string;
  todoColor:string;
  progressColor:string;
  doneColor:string;
  boardName: string;
  boardDesc: string;
  createdDate: Date;
  tasks: {
    todo: number;
    progress: number;
    done: number;
  };
}
