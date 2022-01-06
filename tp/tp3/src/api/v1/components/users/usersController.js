const UserService = require('./usersService');

exports.userList = (req, res) => {
    UserService.queryAllUser().then(result=>{
        res.json(result);
    })
    
};
exports.getUser = (req, res) => {
    const params = req.params;
    if (params.hasOwnProperty('id') && params['id']) {
        UserService.getUserById(params['id'])
            .then(result => {
                if(result != null)
                {
                res.json(result);
                }
                else res.sendStatus(404);
            })
    }
    else {
        res.sendStatus(400);
    }
};
exports.createUser = (req, res) => {
    const body = req.body;
    if (req.body != null && UserService.userDataValidator(body)) {
        UserService.createNewUser(body).then((result)=>{
            res.sendStatus(200)
        })
       
    }
    else {
        res.sendStatus(400);
    }

};
exports.updateUser = (req, res) => {
    const params = req.params;
    const body = req.body;
    if (params.hasOwnProperty('id') && params['id']) {
        UserService.updateUserById(params['id'],body).then(result=>{
            console.log(result);
            if(result)
            res.sendStatus(200);
            else
            res.sendStatus(404);
        })
       
    }
    else {
        res.sendStatus(400);
    }
};
exports.deleteUser = (req, res) => {
    const params = req.params;
    if (params.hasOwnProperty('id') && params['id']) {
        UserService.deleteUserById(params['id']).then(result=>{
            if(result != null)
            res.sendStatus(200);
            else
            res.sendStatus(404);
        });
        
    }
    else {
        res.sendStatus(400);
    }
};