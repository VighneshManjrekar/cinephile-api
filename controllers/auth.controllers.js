const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");
const sendMail = require("../utils/mail");

const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const sendToken = (user, statusCode, res, chatToken) => {
  user.password = undefined;
  const token = user.getSignToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV ? true : false,
  };
  const userData = {
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, chatToken, user:userData });
};

// @desc    Register a user
// @route   POST api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.status(201).json({ success: true });
});

// @desc    Login user
// @route   POST api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const serverClient = connect(api_key, api_secret, app_id);
  // const client = StreamChat.getInstance(api_key, api_secret);

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const chatToken = serverClient.createUserToken(user._id.toString());
  sendToken(user, 200, res, chatToken);
});

// @desc    Forgot Password
// @route   POST api/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse("Email not found", 404));
  }
  const resetLink = user.createResetPassLink();
  const text = `
  Hi ${user.name},
  You recently requested to reset the password for your NetBlink account. Follow this link to proceed:
  ${resetLink}
  If you did not request a password reset, please ignore this email or reply to let us know. This password reset is only valid for the next 10 minutes.
  Thanks!
  `;
  const option = {
    to: user.email,
    subject: "Reset Password",
    text,
  };
  await sendMail(option);
  res.status(200).json({ success: true, data: "Email sent" });
});

// @desc    Reset Password
// @route   POST api/auth/reset-password/:id/:token
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse(`Invalid id`, 400));
  }
  const isValid = user.verifyResetToken(token);
  if (!isValid) {
    return next(new ErrorResponse(`Invalid Token`, 400));
  }
  user.password = password;
  const updatedUser = await user.save();
  res.status(200).json({ success: true, data: updatedUser });
});

// @desc    Logout user
// @route   GET api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});