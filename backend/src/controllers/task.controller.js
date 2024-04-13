import { Progress } from "../model/progress.model.js";
import { Task } from "../model/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespone } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, due_date, project_id } = req.body;
  if (!title || !description || !status || !due_date || !project_id) {
    throw new ApiError(400, "All fields must be provided");
  }
  const taskProgress = await Progress.create({
    description,
    date: Date.now(),
    percentage_completed: 0,
  });
  const createdTask = await Task.create({
    title,
    description,
    status,
    due_date,
    project_id,
    progress_id: taskProgress._id,
  });

  return res
    .status(200)
    .json(
      new ApiRespone(
        201,
        { createdTask, taskProgress },
        "Task created successfully"
      )
    );
});

const updateTaskDetails = asyncHandler(async (req, res) => {
  const { title, description, due_date, status, task_id } = req.body;
  if (!title || !description || !due_date || !status) {
    throw new ApiError(400, "All Fields must be provided");
  }
  const updatedDetails = await Task.findByIdAndUpdate(
    task_id,
    {
      $set: {
        title: title,
        description: description,
        due_date: due_date,
        status: status,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedDetails) new ApiError(404, "Task not Found");
  return res
    .status(200)
    .json(new ApiRespone(201, updatedDetails, "Updated Details Successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { task_id, progress_id } = req.body;
  if (!task_id || !progress_id)
    throw new ApiError(400, "Task ID must be Provided");
  await Progress.deleteOne({ _id: progress_id });
  await Task.deleteOne({ _id: task_id });
  return res.status(200).json(new ApiRespone(201, {}, "Deleted the Task"));
});

export { createTask, updateTaskDetails, deleteTask };
