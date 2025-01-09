import mongoose from "mongoose";
mongoose.connect(
  "mongodb://0.0.0.0:27017/testdb",
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
