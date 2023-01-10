import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const RegisterSchema = mongoose.Schema({
_id:Number,
name:{
    type:String,
    required:[true,"Name is required"],
    lowercase:true,
    trim:true
},
email:{
    type:String,
    required:[true,"email is Required"],
    lowercase:true,
    trim:true,
    unique:true
},
password: {
    type: String,
    required: [true,"Password is required"],
    maxlength: 10,
    minlength:5,
    trim: true
  },
  mobile: {
    type: String,
    required: [true,"Mobile is required"],
    maxlength: 10,
    minlength:10,
    trim: true
  },
  address: {
    type: String,
    required: [true,"Address is required"],
    trim: true
  },
  city: {
    type: String,
    required: [true,"City is required"],
    trim: true
  },
  gender: {
    type: String,
    required: [true,"Gender is required"],
  },
  role: String,
  status: Number,
  info: String
})
RegisterSchema.plugin(uniqueValidator);


const RegisterschemaModel=mongoose.model('reg_tmp',RegisterSchema,'jewelary');

export default RegisterschemaModel;