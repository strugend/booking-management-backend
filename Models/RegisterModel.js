import RegisterschemaModel from "../Schema/Schema.js";
import './connection.js'
import PaymentSchemaModel from "../Schema/PaymentSchema.js";
import ResetPasswordSchemaModel from "../Schema/ResetPasswordSchema.js"; 

class RegisterModel {

    userRegisterModel(userDetails) {
        return new Promise((resolve, reject) => {


            var obj = new RegisterschemaModel(userDetails);
            obj.save((err, result) => {
                err ? reject(err) : resolve(result)
            })

        })
    }


    fetchUsers(condition_obj) {
        return new Promise((resolve, reject) => {

            RegisterschemaModel.find(condition_obj, (err, result) => {
                err ? reject(err) : resolve(result);
            })

        })
    }


    verifyUserModel(vdetails) {
        return new Promise((resolve, reject) => {
            RegisterschemaModel.update(vdetails, { "status": 1 }, (err, result) => {
                err ? reject(err) : resolve(result);
            })
        })
    }





    Payment(pDetails) {
        return new Promise((resolve, reject) => {
            // a document instance
            var obj = new PaymentSchemaModel(pDetails);

            // save model to database
            obj.save((err, result) => {
                err ? reject(err) : resolve(result);
            });
        })
    }




    fetchReset(condition_obj) {
        return new Promise((resolve, reject) => {

            RegisterschemaModel.find(condition_obj, (err, result) => {
                
                err ? reject(err) : resolve(result);
            }) })
    }

    resetPasswordModel(userDetails) {
        return new Promise((resolve, reject) => {
            var obj = new ResetPasswordSchemaModel(userDetails);
            obj.save((err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }


    fetchOtp(condition_obj) {
        return new Promise((resolve, reject) => {
// console.log(condition_obj)
           ResetPasswordSchemaModel.find(condition_obj, (err, result) => {
                // console.log(result)
                err ? reject(err) : resolve(result);
            }) })
    }


newpassupdate(condition_obj){
    return new Promise((resolve, reject) => {
        RegisterschemaModel.updateOne({"email" :condition_obj.email}, {$set:{ "password" : condition_obj.newpass }}, (err, result) => {
            console.log(condition_obj.email)
            err ? reject(err) : resolve(result);
        })
        }) 
    
}
}



export default new RegisterModel();