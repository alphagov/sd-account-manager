const mongoose = require('mongoose');
const { Schema } = mongoose;

techSchema = new Schema({
  techId: {
    type: Number,
    required: true
  },
  apiKey: String,
  firstName: String,
  lastName: String
});

mongoose.model('techs', techSchema);
