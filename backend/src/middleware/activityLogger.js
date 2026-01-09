import ActivityLog from "../models/ActivityLog.model.js";

export const activityLogger = (action, resource) => {
  return async (req, res, next) => {
    // wait until response finishes
    res.on("finish", async () => {
      try {
        // log only successful actions
        if (res.statusCode >= 200 && res.statusCode < 300) {
          await ActivityLog.create({
            user: req.user?.id || null,
            action,
            resource,
            resourceId: req.params.id || null,
            ipAddress: req.ip,
          });

          console.log(
            `[ACTIVITY] User: ${
              req.user?.id || "Guest"
            } | Action: ${action} | Resource: ${resource}`
          );
        }
      } catch (error) {
        console.error("Activity log failed:", error.message);
      }
    });

    next();
  };
};
