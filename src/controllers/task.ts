import { Request, Response } from "express";
import { Task } from "../models/task";

// get all task for given user
export const getAllTasks = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;

  try {
    const tasks = await Task.find({ assigned_user: user_id });
    return res.status(200).json({
      status: true,
      data: tasks,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }
};

// get only one task for given user
export const getOneTask = async (req: Request, res: Response) => {
  const task_id = req.query.task_id;

  try {
    const tasks = await Task.findById(task_id);

    return res.status(200).json({
      status: true,
      data: [tasks],
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }
};

// create new task for user
export const createNewTask = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const due_date = req.body.due_data;

  try {
    // creating new task
    const task = await Task.create({
      title: title,
      description: description,
      assigned_user: user_id,
      due_date: due_date,
      completed: false,
    });

    // saving task
    await task.save();
    return res.status(201).json({
      status: true,
      message: "task created successfully!",
      data: [task],
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }
};

// delete task
export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.body.task_id;

  if (!taskId) {
    return res.status(400).json({
      status: false,
      message: "bad request!",
    });
  }

  try {
    const task = await Task.findByIdAndDelete(taskId);
    return res.status(200).json({
      status: true,
      message: "task deleted successfully",
      data: [task],
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }
};

// update task
export const updateTask = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const due_date = req.body.due_data;
  const completed = req.body.completed;

  try {
    const task = await Task.findOneAndUpdate({ assigned_user: user_id });
    if (task) {
      if (title) task.title = title;
      if (description) task.description = description;
      if (due_date) task.due_date = due_date;
      if (completed) task.completed = completed;
      await task.save();
    }

    return res.status(201).json({
      status: true,
      message: "task updated successfully!",
      data: [task],
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }
};

export const taskAnalytics = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;

  try {
    const tasks = await Task.find({ assigned_user: user_id });

    const task_assigned = tasks.map((task) => ({
      title: task.title,
      due_date: task.due_date,
    }));

    const task_completed = tasks
      .filter((task) => {
        return task.completed === true;
      })
      .map((task) => ({
        title: task.title,
        due_date: task.due_date,
      }));

    const incomplete_task = tasks
      .filter((task) => !task.completed)
      .map((task) => ({
        title: task.title,
        due_date: task.due_date,
      }));

    return res.status(200).json({
      status: true,
      message: "task analytics",
      analytics: {
        assigned_tasks: task_assigned.length,
        completed_tasks: task_completed.length,
        incomplete_tasks: incomplete_task.length,
        tasks: {
          task_assigned,
          task_completed,
          incomplete_task,
        },
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "some error occured:(",
      error: err,
    });
  }
};
