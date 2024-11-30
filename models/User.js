const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
});

// Add the passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

// Check if the model is already defined, if not, define it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
