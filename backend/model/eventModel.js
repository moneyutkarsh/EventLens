const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Please add a title']
    },
    description: String,
    date: Date,
    location: String,
    category: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
