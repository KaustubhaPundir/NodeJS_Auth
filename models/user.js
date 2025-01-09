import mongoose from "mongoose";
mongoose.connect(
  'mongodb+srv://user1:user1@testdb.9y9kf.mongodb.net/',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
