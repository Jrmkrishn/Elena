import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRespone } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";

const generateAccessTokenAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return new ApiError(
      500,
      "Something went wrong while generate Access token and refresh tokenx"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field must be provided!");
  }
  const existUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existUser) {
    throw new ApiError(400, "User or Email already Exists");
  }
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });
  let createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError("Error occurred While creating the User");
  }
  console.log(createdUser);
  return res
    .status(200)
    .json(new ApiRespone(201, createdUser, "User created Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) throw new ApiError(404, "User not Found");
  const validatePassword = await user.isMatchingPassword(password);
  if (!validatePassword) throw new ApiError(401, "Password doesn't Match");

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);
  const loggedInUser = await User.findOne(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .cookie("access_token", accessToken)
    .cookie("refresh_token", refreshToken)
    .json(
      new ApiRespone(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Login Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );
  let options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(new ApiRespone(200, "User Logout Successfully"));
});



export { registerUser, loginUser, logoutUser };
