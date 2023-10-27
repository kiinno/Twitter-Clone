import { Schema, models, model, SchemaTypes } from "mongoose";

const notificationSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", notificationSchema);

export default Notification;
