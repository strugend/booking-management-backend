import Otp from '../Schema/OtpSchema.js'
import nodemailer from 'nodemailer';


const changePassword = async (req, res) => {
    let data = await Otp.findOne({ email: req.body.email, code: req.body.otpcode });
    const response = {}
    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if (diff < 0) {
            response.message = 'token Expire';
            response.statusText = "error";
        }
        else {
            let user = await Otp.findOne({ email: req.body.email });
            user.password = req.body.password;
            user.save();
            response.message = 'Password Change';
            response.statusText = 'success';
        }
    }
    else{
        response.message = 'Invalid OTP';
        response.statusText = 'error';
    }
    res.status(200).json(response);
}




const mailer = (email, otp) => {


}
module.exports = {
    emailSend
}