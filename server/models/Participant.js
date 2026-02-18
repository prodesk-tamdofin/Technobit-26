const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  qrCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  caRef: {
    type: String,
    default: null,
  },
  fullName: {
    type: String,
    required: true,
    index: true,
  },
  roll: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
    index: true,
  },
  fb: {
    type: String,
    default: null,
  },
  institute: {
    type: String,
    required: true,
    index: true,
  },
  className: {
    type: String,
    required: true,
    index: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  boothReg: {
    type: Boolean,
    default: false,
  },
  boothFee: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
    default: null,
  },
  otpCount: {
    type: Number,
    default: 0,
  },
  otpTime: {
    type: String,
    default: null,
  },
  checkedIn: {
    type: Boolean,
    default: false,
    index: true,
  },
  // Array of event IDs registered for - keeps it simple and small
  registeredEvents: [{
    type: String,
    default: [],
  }],
}, {
  timestamps: true,
});

// Compound index for faster lookups
participantSchema.index({ college: 1, className: 1 });
participantSchema.index({ email: 1, userName: 1 });

module.exports = mongoose.model('Participant', participantSchema);
