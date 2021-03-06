import bcrypt from 'bcrypt'
import config from '../../config'
import { Patient, Doctor, Auth, Appointment } from '../../models/index'

async function loadAuth () {
  const saltRounds = 12
  const promises = []

  // Patients
  let userType = config.USER_TYPES.PATIENT
  let password = await bcrypt.hash('pencil', saltRounds)
  promises.push(createAuth({ emailAddress: 'pencilvester@test.com', password, userType }))
  password = await bcrypt.hash('jessica', saltRounds)
  promises.push(createAuth({ emailAddress: 'morty@test.com', password, userType }))
  password = await bcrypt.hash('schwifty', saltRounds)
  promises.push(createAuth({ emailAddress: 'rick@test.com', password, userType }))
  password = await bcrypt.hash('horses', saltRounds)
  promises.push(createAuth({ emailAddress: 'beth@test.com', password, userType }))
  password = await bcrypt.hash('apples', saltRounds)
  promises.push(createAuth({ emailAddress: 'jerry@test.com', password, userType }))
  password = await bcrypt.hash('phoenix', saltRounds)
  promises.push(createAuth({ emailAddress: 'birdperson@test.com', password, userType }))
  password = await bcrypt.hash('top', saltRounds)
  promises.push(createAuth({ emailAddress: 'summer@test.com', password, userType }))
  password = await bcrypt.hash('clockwork', saltRounds)
  promises.push(createAuth({ emailAddress: 'gearhead@test.com', password, userType }))
  password = await bcrypt.hash('icet', saltRounds)
  promises.push(createAuth({ emailAddress: 'watert@test.com', password, userType }))
  password = await bcrypt.hash('bird', saltRounds)
  promises.push(createAuth({ emailAddress: 'tammy@test.com', password, userType }))

  // Doctors
  userType = config.USER_TYPES.DOCTOR
  password = await bcrypt.hash('marty', saltRounds)
  promises.push(createAuth({ emailAddress: 'doc@test.com', password, userType }))
  password = await bcrypt.hash('zimmer', saltRounds)
  promises.push(createAuth({ emailAddress: 'hans@test.com', password, userType }))
  password = await bcrypt.hash('c137', saltRounds)
  promises.push(createAuth({ emailAddress: 'sanchez@test.com', password, userType }))
  return Promise.all(promises)
}

async function loadPatients () {
  const promises = []
  promises.push(createPatient({
    name: 'Pencilvester',
    age: 10,
    emailAddress: 'pencilvester@test.com',
    mailingAddress: '123 Pencil Ave. Chicago, IL 60614',
    phoneNumber: 1231231234
  }))

  promises.push(createPatient({
    name: 'Morty Smith',
    age: 10,
    emailAddress: 'morty@test.com',
    mailingAddress: '123 Glenn Ave. Chicago, IL 60614',
    phoneNumber: 2488911234
  }))

  promises.push(createPatient({
    name: 'Rick Sanchez',
    age: 65,
    emailAddress: 'rick@test.com',
    mailingAddress: '123 Glenn Ave. Chicago, IL 60614',
    phoneNumber: 2481239090
  }))

  promises.push(createPatient({
    name: 'Beth Smith',
    age: 40,
    emailAddress: 'beth@test.com',
    mailingAddress: '123 Glenn Ave. Chicago, IL 60614',
    phoneNumber: 2481238888
  }))

  promises.push(createPatient({
    name: 'Jerry Smith',
    age: 41,
    emailAddress: 'jerry@test.com',
    mailingAddress: '123 Glenn Ave. Chicago, IL 60614',
    phoneNumber: 2481239191
  }))

  promises.push(createPatient({
    name: 'Bird Person',
    age: 95,
    emailAddress: 'birdperson@test.com',
    mailingAddress: '123 Feathers St. Chicago, IL 60614',
    phoneNumber: 1111231234
  }))

  promises.push(createPatient({
    name: 'Summer Smith',
    age: 16,
    emailAddress: 'summer@test.com',
    mailingAddress: '123 Glenn Ave. Chicago, IL 60614',
    phoneNumber: 2482542546
  }))

  promises.push(createPatient({
    name: 'Gear Head',
    age: 35,
    emailAddress: 'gearhead@test.com',
    mailingAddress: '555 Gears St. Chicago, IL 60614',
    phoneNumber: 9879876541
  }))

  promises.push(createPatient({
    name: 'Water T',
    age: 45,
    emailAddress: 'watert@test.com',
    mailingAddress: '9090 Alphabetrium St. Chicago, IL 60614',
    phoneNumber: 3453451234
  }))

  promises.push(createPatient({
    name: 'Tammy Rogers',
    age: 16,
    emailAddress: 'tammy@test.com',
    mailingAddress: '1456 Poppy Ct. Chicago, IL 60614',
    phoneNumber: 1239089087
  }))

  return Promise.all(promises)
}

async function loadDoctors () {
  const promises = []

  promises.push(createDoctor({
    name: 'Dr. Doc Brown',
    emailAddress: 'doc@test.com',
    hospital: 'St. Andrews Hospital',
    specialty: 'Neurosurgeon'
  }))

  promises.push(createDoctor({
    name: 'Dr. Hans Zimmer',
    emailAddress: 'hans@test.com',
    hospital: 'Mott Children\'s Hospital',
    specialty: 'General Physician'
  }))

  promises.push(createDoctor({
    name: 'Dr. Javier Sanchez',
    emailAddress: 'sanchez@test.com',
    hospital: 'St. Jude Hospital',
    specialty: 'Dermatologist'
  }))

  return Promise.all(promises)
}

async function loadAppointmentCollection () {
  // Create empty appointment to create collection for initial queries to appointment collection
  return Appointment.create({})
}

async function createAuth ({ emailAddress, password, userType }) {
  return Auth.create({ emailAddress, password, userType })
}

async function createPatient ({ name, age, emailAddress, mailingAddress, phoneNumber }) {
  return Patient.create({ name, age, emailAddress, mailingAddress, phoneNumber })
}

async function createDoctor ({ name, emailAddress, hospital, specialty }) {
  return Doctor.create({ name, emailAddress, hospital, specialty })
}

export default async () => {
  return Promise.all([loadAuth(), loadPatients(), loadDoctors(), loadAppointmentCollection()])
}
