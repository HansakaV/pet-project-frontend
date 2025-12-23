export default interface Task {
  _id: string;
  projectId: string; // Reference to parent project
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  
}