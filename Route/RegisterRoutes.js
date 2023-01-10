import express from 'express';
import RegisterControler from '../controller/ResisterController.js';
import jwt from 'jsonwebtoken';
import {sendMail} from './cmailAPI.js'
import * as url from 'url';


const router=express.Router();

router.post('/register',(req,res)=>{
    RegisterControler. userRegister(req.body).then((result)=>{
        sendMail(req.body.email)
        res.json({"result":"Success"})
    }).catch((err)=>{
        res.json({"result":err});
    });
});





router.get("/verifyuser",(req,res)=>{ 
    var vDetails=url.parse(req.url,true).query;
    RegisterControler.verifyUser(vDetails).then((result)=>{
     res.json({"result":"Verification success...."});  
    }).catch((err)=>{
     res.json({"result":"Verification failed"});
    });  
   });






router.post('/login',(req,res)=>{
    RegisterControler.userLogin(req.body).then((result)=>{
        if(result.rescode==0)
              res.json({"token":"error"});
        else{
            let payload = {"subject":result.userDetails.email};
            let token = jwt.sign(payload,"Nainaz is my life-line");
            res.json({"token":token,"userDetails":result.userDetails});
        }
    }).catch((err)=>{
        res.json({"token":"error"});

    
    });
})


router.get("/funds",(req,res)=>{ 
    var paypalURL="https://www.sandbox.paypal.com/cgi-bin/webscr";
    var paypalID="sb-l0g9p22983574@business.example.com";
    var amount=100;
    // password = _LZ5p$<M
    //sb-fbih321458898@personal.example.com
    res.json({"paypalURL":paypalURL,"paypalID":paypalID,"amount":amount}); 
  });
  
  router.post("/payment",(req,res)=>{ 
    var pDetails=url.parse(req.url,true).query;
    RegisterControler.payment(pDetails).then((result)=>{
      res.json({"result":result});  
    }).catch((err)=>{
      console.log(err);
    });
  });
  
  router.post("/resetPassword",(req,res)=>{
    //console.log(req.body);
    RegisterControler.resetPassword(req.body).then((result)=>{
console.log(req.body.email)
     sendMail(req.body.email);
     res.json({"result":"Email successfully sent...."});  
    }).catch((err)=>{
     res.json({"result":err});
    });
   });

   router.post('/verifyOtp' ,(req,res)=>{
    RegisterControler.verifyotp(req.body ).then((result)=>{
  
      res.json(result);  
     }).catch((err)=>{
      res.json({"result":err});
     });
   })
   
   router.post('/newPassword' ,(req,res)=>{
    var email=url.parse(req.url,true).query.email;
    let vDetails = req.body;
    vDetails={...vDetails,"email":email};
    
    RegisterControler.newpass(vDetails).then((result)=>{
    res.json({"result" : "success"});  
     }).catch((err)=>{
      res.json({"result":err});
     });
   } )




export default router;