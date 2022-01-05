const mongoose = require('mongoose');

//Scheme and model
const userSchema = new mongoose.Schema({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    creationDate: "",
    role: "",
});
const User = mongoose.model('user', userSchema);

class UserService {
    static userDataValidator(bodyContent) {
        let contentValidated =
            bodyContent.hasOwnProperty('email') && bodyContent['email'] != ""
            && bodyContent.hasOwnProperty('firstName') && bodyContent['firstName'] != ""
            && bodyContent.hasOwnProperty('lastName') && bodyContent['lastName'] != ""
        return contentValidated;
    }

    //Functions:
    /**
     * Create new user in the database, if the user with a username already exist, it don't create a new one.
     * @param {*} newUserData User data received from user.
     * @returns True if the user with username don't exist on the database, else false.
     */
    static createNewUser(newUserData) {

        const newUser = new User({
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password: newUserData.password,
            phone: newUserData.phone,
            creationDate: new Date().toISOString(),
            role: newUserData.role,
        });
        console.log(newUser);
        const promise = new Promise((resolve) => {
            newUser.save();
            resolve(true);
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