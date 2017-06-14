import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Auth = mongoose.model('Auth', new Schema({
  emailAddress: String,
  password: String,
  userType: String
}))
