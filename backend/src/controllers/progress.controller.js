import { Progress } from "../model/progress.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespone } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateProgress = asyncHandler(async (req, res) => {
  const { progress_id, percentage_completed } = req.body;
  if (!progress_id || !percentage_completed)
    throw new ApiError(400, "All fields must be provided");
  const IsProgress = await Progress.findByIdAndUpdate(
    progress_id,
    {
      $set: {
        percentage_completed: percentage_completed,
      },
    },
    {
      new: true,
    }
  );
  if (!IsProgress) throw new ApiError(500, "Error while updating progress");
  return res
    .status(200)
    .json(new ApiRespone(201, IsProgress, "Updated the progress"));
});

export { updateProgress };
