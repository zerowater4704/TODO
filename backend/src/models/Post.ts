import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
}
