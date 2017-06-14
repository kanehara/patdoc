import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Doctor = mongoose.model('Doctor', new Schema({
  name: String,
  emailAddress: String,
  hospital: String,
  specialty: String
}))
