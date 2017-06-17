import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Appointment = mongoose.model('Appointment', new Schema({
  date: Date,
  subject: String,
  notes: String,
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  status: String
}))
