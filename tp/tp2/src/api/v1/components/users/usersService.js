class UserService {
   static userDataValidator(bodyContent) {
        let contentValidated =
            bodyContent.hasOwnProperty('email') && bodyContent['email'] != ""
            && bodyContent.hasOwnProperty('firstName') && bodyContent['firstName'] != ""
            && bodyContent.hasOwnProperty('lastName') && bodyContent['lastName'] != ""
        return contentValidated;
    }
}

module.exports = UserService;