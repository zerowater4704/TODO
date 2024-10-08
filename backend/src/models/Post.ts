import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IPost>("Post", postSchema);
