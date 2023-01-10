// import nodemailer from 'nodemailer';

// export function sendMail(email)
// {
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'sonycrickets@gmail.com',
//     pass: 'egqvrqrljbidndtr'
//   }
  
// });

// var mailOptions = {
//   from: 'sonycrickets@gmail.com',
//   to: email,
//   subject: 'Verification mail RoomRent.com',
//   html: "<h1>Welcome to RoomRent.com</h1><p>You have successfully register to our app , your login credentials are attached below</p><h3>Username : "+email+"</h3><h3>Password : "+password+"</h3><h2>Click on the link below to verify your account</h2> http://localhost:3000/verifyuser/"+email
// };
// // https://myaccount.google.com/lesssecureapps

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 
// }

import sgMail from '@sendgrid/mail' ;

const API_KEY = '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 ';

sgMail.setApiKey(API_KEY)

export function sendMail (email){
  sgMail.send({
    to: 'mdarbazpatel92@gmail.com',
    from: 'sonycrickets@gmail.com',
     subject: 'Verification mail RoomRent.com',
     html: "<h1>Welcome to RoomRent.com</h1><p>You have successfully register to our app , your login credentials are attached below</p><h3>Username : "+email+"</h3><h2>Click on the link below to verify your account</h2> http://localhost:3000/verifyuser/"+email
    
  }
  ).then((response)=>console.log("email send")).catch(
    (err)=>console.log(err.message)
  )
}





