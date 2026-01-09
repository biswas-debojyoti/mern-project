import User from "../models/User.model.js";

export const getTotalUsersService = async () => {
  return await User.countDocuments();
};

export const getAllUsersService = async () => {
  return await User.find()
    .select("-password") // never expose password
    .sort({ createdAt: -1 });
};
