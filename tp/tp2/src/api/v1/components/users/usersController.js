const UserService = require('./usersService');
const usersData = require('../../../../UserData');
const { userDataValidator } = require('./usersService');
exports.userList = (req, res) => {
    res.json(usersData);
    res.sendStatus(200);
};
exports.getUser = (req, res) => {
    const query = req.query;
    if (query.hasOwnProperty('id') && query['id']) {
        const userFound = usersData.find(element => element['id'] == query['id'])
        if (userFound != null) {
            res.json(userFound);
            res.sendStatus(200);
        }
        else
            res.sendStatus(404);
    }
    else {
        res.sendStatus(400);
    }
};
exports.createUser = (req, res) => {
    const body = req.body;
    const newUser = {
        id: usersData.length + 1,
        firstName: body['firstname'],
        lastName: body['lastname'],
        email: body['email'],
        password: body['password'],
        phone: body['phone'],
        creationDate: new Date().toISOString(),
        role: body['role'],
    };
    console.log(body)
    if (req.body != null && UserService.userDataValidator(body)) {
        usersData.push(newUser);
        console.log("User list with addition:", usersData);
        res.sendStatus(200)
    }
    else {
        res.sendStatus(400);
    }

};
exports.updateUser = (req, res) => {
    const body = req.body;
    if (body.hasOwnProperty('id') && body['id']) {
        let userFoundIndex = usersData.findIndex(element => element['id'] == body['id']);
        if (userFoundIndex >= 0) {
            usersData[userFoundIndex] = body;
            console.log("User list with modification:", usersData);
            res.sendStatus(200);
        }
        else res.sendStatus(404);
    }
    else {
        res.sendStatus(400);
    }
};
exports.deleteUser = (req, res) => {
    const body = req.body;
    if (body.hasOwnProperty('id') && body['id'])
    {
        let userFoundIndex = usersData.findIndex(element => element['id'] == body['id']);
        if (userFoundIndex >= 0) {
            usersData[userFoundIndex] = body;
            usersData.splice(userFoundIndex,1);
            console.log("User list without deleted user: ", usersData);
            res.sendStatus(200);
        }
        else res.sendStatus(404);
    }
    else {
        res.sendStatus(400);
    }
};