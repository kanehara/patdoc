import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Patient = mongoose.model('Patient', new Schema({
  name: String,
  age: Number,
  emailAddress: String,
  mailingAddress: String,
  phoneNumber: Number
}))
