export interface Task {
   _id: string;
   userId: string;
   taskName: string;
   commentsCount: number;
   createdDate: string;
   status:string;
   boardId:string;
   archived:boolean;
 }
 