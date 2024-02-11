const { Schema, model } = require('mongoose');
const { default: fetch } = require('node-fetch');


const plantSchema = new Schema({
  name: {
      type: String,
    },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  plantId: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  lowLight: {
    type: Boolean,
    // required: true,
  },
  indoor: {
    type: Boolean,
    // required: true,
  },
});

plantSchema.statics.findOneOrCreate = async function(plantId) {
 // Find the plant by ID
 const savedPlant = await Plant.findOne({plantId});


 if (savedPlant) {
   return savedPlant
 }
 const response = await fetch (`https://perenual.com/api/species-list?key=sk-S9zG65c4f45dab87a4077&page=1${plantId}`)
 if(!response.ok) {
  return null;
 }
 const data = await response.json();
 console.log(data);
 const { common_name, scientific_name, default_image } = data;
 const name = common_name || "Unknown Name";
 const description = scientific_name && scientific_name.length > 0 ? scientific_name[0] : "No description available";

 const newPlant = await Plant.create({
//TODO: ADD THE PLANT DATA TO THE PROPERTIES DEFINED ABOVE
name: name,
description: description,
plantId: plantId,
image: default_image ? default_image.thumbnail : null,
 })
 return newPlant;
}

const Plant = model('Plant', plantSchema);

module.exports = Plant;
