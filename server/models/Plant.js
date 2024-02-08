const { Schema, model } = require('mongoose');


const plantSchema = new Schema({
  name: {
      type: String,
    },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  plantId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  lowLight: {
    type: boolean,
    required: true,
  },
  indoor: {
    type: boolean,
    required: true,
  },
});

const Plant = model('Plant', plantSchema);

module.exports = Plant;
