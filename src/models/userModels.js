import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usuario :{
    type: String,
    require: true,
    trim:true
  },
  email :{
    type: String,
    require: true,
    trim:true,
    unique:true
  },
  password :{
    type: String,
    require: true
  }
},
{
  timestamps: true
});

export default mongoose.model('User', userSchema);

