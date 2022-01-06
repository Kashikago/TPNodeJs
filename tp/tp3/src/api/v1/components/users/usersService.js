const  User = require("../users/Models/userModel");
class UserService {
 
    static userDataValidator(bodyContent) {
        let contentValidated =
            bodyContent.hasOwnProperty('email') && bodyContent['email'] != ""
            && bodyContent.hasOwnProperty('firstName') && bodyContent['firstName'] != ""
            && bodyContent.hasOwnProperty('lastName') && bodyContent['lastName'] != ""
        return contentValidated;
    }
    static createNewUser(newUserData) {

        const newUser = new User({
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password:"",
            phone: newUserData.phone,
            role: newUserData.role,
        });
        console.log(newUser);
        const promise = new Promise((resolve) => {
            newUser.save();
            resolve(true);
        }).catch(err=>{
            console.log(err);
            resolve(false);
        })
        return promise;
    }
    static queryAllUser() {
        const promise = new Promise((resolve) => {
            User.find().then((result) => {
                resolve(result);
            });
        });
        return promise;
    }

    static getUserById(id) {
        const promise = new Promise((resolve) => {
            User.find({ _id: id }).then((result) => {
                resolve(result);
            }).catch(err => { resolve(null) })
        });
        return promise;
    }
    static updateUserById(id, updatedData) {

        const promise = new Promise((resolve) => {
            User.findByIdAndUpdate({ _id: id }, updatedData).then(result=>{
                resolve(result);
            })
        });
        return promise;
    }
    static deleteUserById(id)
    {
        const promise = new Promise((resolve)=>{
            User.findByIdAndDelete(id).then(result=>{
                resolve(result);
            })
        });
        return promise;
    }
}

module.exports = UserService;