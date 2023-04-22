const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  userId: { String: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true},
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { Number: String, defaut: 0},
  dislikes: { Number: String, defaut: 0 },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  usersLiked: { type: [String] },
  usersDislicked: { type: [String] },
});

module.exports = mongoose.model('Thing', thingSchema);