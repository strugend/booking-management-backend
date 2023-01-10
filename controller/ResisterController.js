import RegisterModel from "../Models/RegisterModel.js";
// import { resolve } from 'url';
// import { rejects } from 'assert';
// import RegisterModel from '../models/IndexModel.js';
import { resolve } from 'url';
import { rejects } from 'assert';
import ResetPasswordSchemaModel from "../Schema/ResetPasswordSchema.js";

class  RegisterControler
{
 userRegister(userDetails)
 {
  return new Promise((resolve,reject)=>{
    RegisterModel.fetchUsers({}).then((result=>{
     var l=result.length
     var _id=l==0 ? 1 : result[l-1]._id+1;    
     userDetails={...userDetails,_id:_id,status:0,role:"user",info:Date()};
     RegisterModel.userRegisterModel(userDetails).then((result)=>{
        resolve(result);    
     }).catch((err)=>{
        reject(err);    
     });
    })).catch((err)=>{
     reject(err);            
    })       
  });  
 }

 userLogin(userDetails)
 {
  return new Promise((resolve,reject)=>{
    userDetails={...userDetails,status:1}
    RegisterModel.fetchUsers(userDetails).then((result)=>{
      const res=result.length==0? 0 :(result[0].role=="admin")?1:2;
      resolve({rescode:res,"userDetails":result[0]});  
    }).catch((err)=>{
     reject(err);  
    });  
  });
 }

 verifyUser(vdetails)
 {
  return new Promise((resolve, reject)=>{
    RegisterModel.verifyUserModel(vdetails).then((result)=>{
      resolve(result);
    }).catch((err)=>{
      reject(err);
    })
  })
 }

 payment(pDetails)
 {
  return new Promise((resolve,reject)=>{
     pDetails={...pDetails,"_id":Date.now(),"info":Date()};
     RegisterModel.Payment(pDetails).then((result)=>{
        resolve(result);    
     }).catch((err)=>{
        reject(err);    
     });         
  });  
 }
 resetPassword(userDetails)
 {
  return new Promise((resolve,reject)=>{
    let email = userDetails.email ;
    RegisterModel.fetchReset({email}).then((result=>{
    
      //  console.log(result)
      //  console.log(userDetails)
      //  console.log(email)
 
      let otpcode = Math.ceil((Math.random() * 10000) + 1) ; 
       
if(result.length===0){
 return reject("Err")
}else{
  userDetails={...userDetails,otp: otpcode,info:Date()};
     RegisterModel.resetPasswordModel(userDetails).then((result)=>{
        resolve(result);    
     }).catch((err)=>{
      reject(err);    
   });
}   })).catch((err)=>{
     reject(err);            
    })       
  });  
 }


 verifyotp(userDetails){
  return new Promise ((resolve,reject)=>{
    let email = userDetails.email ;
    let otps = userDetails.otp;
// console.log(otps)
    RegisterModel.fetchOtp({email}).then((result)=>{
  
      if(otps===result[0]. otp){
     
      ResetPasswordSchemaModel.deleteOne({email} ,(err, result) => {
                
        err ? reject(err) :  resolve({"result":"success"});;
    });
    }
     else{
      reject(err);
     }
}   ).catch((err)=>{
     reject(err);            
    }) })  }

    newpass(newpass){
      return new Promise((resolve,reject)=>{
        RegisterModel.newpassupdate(newpass).then((result)=>{
          resolve(result);
        }).catch((err)=>{
          reject(err);
        })
      })
    }

}

export default new  RegisterControler();