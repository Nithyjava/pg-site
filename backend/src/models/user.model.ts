import {Document, Schema, model} from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  location: string;
  role: 'user' | 'admin' | 'pg-owner'; // Add the role field with possible values
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin' , 'pg-owner'], default: 'user' }, 
  location: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;