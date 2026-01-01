export default interface Task {
  _id: string;
  projectId: string; 
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  
}