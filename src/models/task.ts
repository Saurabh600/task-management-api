import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: String,
  description: String,
  assigned_user: mongoose.SchemaTypes.ObjectId,
  due_date: Date,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

export { Task };
