import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
    },

    resource: {
      type: String, // Post, Comment, Auth
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
