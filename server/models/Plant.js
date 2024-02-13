const { Schema, model, Types } = require('mongoose');
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
  sunlight: {
    type: [String],
    // required: true,
  },
  indoor: {
    type: Boolean,
    // required: true,
  },
  watering: {
    type: String,
  }
});

plantSchema.statics.findOneOrCreate = async function(plantInput) {
  const plantId = plantInput.plantId
  // Find the plant by ID
  console.log(plantId);
  const savedPlant = await Plant.findOne({plantId});
 
 
  if (savedPlant) {
    return savedPlant
  }
  const response = await fetch (`https://perenual.com/api/species/details/${plantId}?key=sk-S9zG65c4f45dab87a4077`)
  if(!response.ok) {
   return null;
  }
  const data = await response.json();
  console.log(data);
  const { common_name, description, default_image, indoor, sunlight, watering } = data;
 
  console.log({
   //TODO: ADD THE PLANT DATA TO THE PROPERTIES DEFINED ABOVE
   name: common_name,
   description: description,
   plantId: plantId,
   image: default_image.medium_url,
   indoor: indoor,
   sunlight: sunlight,
   watering: watering,
    })
 
  const newPlant = await Plant.create({
 //TODO: ADD THE PLANT DATA TO THE PROPERTIES DEFINED ABOVE
  name: common_name,
  description: description,
  plantId: plantId,
  image: default_image.medium_url,
  indoor: indoor,
  sunlight: sunlight,
  watering: watering,
  })
  return newPlant;
}

// plantSchema.statics.findOneOrCreate = async function(plantId) {
//  // Find the plant by ID (NEEDS FIXING)
//  const savedPlant = await Plant.findOne({plantId});
// console.log(plantId);

//  if (savedPlant) {
//    return savedPlant
//  }
//  const response = await fetch (`https://perenual.com/api/species/details/${plantId}?key=sk-S9zG65c4f45dab87a4077`)
//  if(!response.ok) {
//   return null;
//  }
//  const data = await response.json();
//  console.log(data);
//  const { common_name, scientific_name, default_image } = data;
//  const name = common_name || "Unknown Name";
//  const description = scientific_name && scientific_name.length > 0 ? scientific_name[0] : "No description available";
//  console.log({
//   //TODO: ADD THE PLANT DATA TO THE PROPERTIES DEFINED ABOVE
//   name: name,
//   description: description,
//   plantId: plantId.toString(),
//   image: data.medium_url ? default_image.thumbnail : null,
//   sunlight: data.sunlight,
//   indoor: data.indoor,
//   watering: data.watering
//    })

//  const newPlant = await Plant.create({
// //TODO: ADD THE PLANT DATA TO THE PROPERTIES DEFINED ABOVE
// name: name,
// description: description,
// plantId: plantId.toString(),
// image: data.medium_url ? default_image.thumbnail : null,
// sunlight: data.sunlight,
// indoor: data.indoor,
// watering: data.watering
//  })
//  return newPlant;
// }

const Plant = model('Plant', plantSchema);

module.exports = Plant;
