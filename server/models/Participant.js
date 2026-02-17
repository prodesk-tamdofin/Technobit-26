const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  qrCode: {
    type: String,
    required: true,
    unique: true,
  },
  caRef: {
    type: String,
    default: null,
  },
  fullName: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  fb: {
    type: String,
    default: null,
  },
  institute: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
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
  },
  phone: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
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
  },
  // Event registrations stored as JSON
  events: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Participant', participantSchema);
