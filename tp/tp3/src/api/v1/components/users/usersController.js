const UserService = require('./usersService');

exports.userList = (req, res) => {
    UserService.queryAllUser().then(result=>{
        res.json(result);
    })
    
};
exports.getUser = (req, res) => {
    const query = req.query;
    if (query.hasOwnProperty('id') && query['id']) {
        UserService.getUserById(query['id'])
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
    const query = req.query;
    const body = req.body;
    if (query.hasOwnProperty('id') && query['id']) {
        UserService.updateUserById(query['id'],body).then(result=>{
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
    const query = req.query;
    if (query.hasOwnProperty('id') && query['id']) {
        UserService.deleteUserById(query['id']).then(result=>{
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