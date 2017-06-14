import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Doctor = mongoose.model('Doctor', new Schema({
  name: String,
  // TODO: populate hospital to surface to patients
  hospital: String,
  // TODO: populate specialty to surface to patients
  specialty: String
}))
