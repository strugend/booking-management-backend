import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const ResetPasswordSchema = mongoose.Schema({


email:{
    type:String,
    required:[true,"email is Required"],
    lowercase:true,
    trim:true,
},
  otp: String,
  info: String
})



const ResetPasswordSchemaModel=mongoose.model('resetCodes_tmp',ResetPasswordSchema,'resetCodes');

export default ResetPasswordSchemaModel;