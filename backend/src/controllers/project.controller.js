import { Project } from "../model/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespone } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProject = asyncHandler(async (req, res) => {
  const { name, description, created_by } = req.body;
  if (!name || !description || !created_by)
    throw new ApiError(400, "All Fields must be Provided");
  const newProject = await Project.create({
    name,
    description,
    created_by,
  });
  return res
    .status(200)
    .json(new ApiRespone(201, newProject, "Project created Successfully"));
});
const updatedProjectDetails = asyncHandler(async (req, res) => {
  const { name, description, project_id } = req.body;
  if (!name || !description || !project_id)
    new ApiError(400, "All fields must be provided");
  const updatedProject = await Project.findByIdAndUpdate(project_id, {
    $set: {
      name: name,
      description: description,
    },
  });
  return res
    .status(200)
    .json(new ApiRespone(201, updatedProject, "Updated details Successfully"));
});
const deleteProject = asyncHandler(async (req, res) => {
  const { project_id } = req.body;
  if (!project_id) throw new ApiError(400, "Project ID must be Provided");
  await Project.deleteOne({ _id: project_id });
  return res.status(200).json(new ApiRespone(201, {}, "Deleted the project"));
});

export { createProject, updatedProjectDetails, deleteProject };
