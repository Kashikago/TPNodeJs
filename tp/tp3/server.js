const config = require('./src/config/env.config');
const router = require('./src/api/v1/router');
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

//DB Connection
async function ConnectionToDB() {
    await mongoose.connect("mongodb://localhost:27017/apiDB", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB Connection state: ", mongoose.STATES[mongoose.connection.readyState]);
}
ConnectionToDB().catch(err => console.log(err));

//Header
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    //Expose right header:
    if(req.method ==='OPTIONS'){
        res.header('Acces-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');
        return res.status(200).json({});
    }
    next();
});
//Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan(config.format_logs))
app.use(cors());


//Route
router(app);


app.listen(config.port, () => {
    console.log(`Server listening on port:${config.port} in ${config.node_env} `);
});

// //API endpoints
// app.get("/userList", (req, res) => {
//     queryAllUser().then((result) => {
//         res.json(result);
//     })
// });
// app.get("/getUser", (req, res) => {
//     const query = req.query;
//     if (query.hasOwnProperty('id') && query['id'])
//         getUserById(query.id).then((result) => {
//             res.json(result);
//             res.sendStatus(200);
//         });
//     else {
//         res.sendStatus(400);
//     }
// });
// app.post("/createUser", jsonParser, (req, res) => {
//     const body = req.body;
//     if (req.body != null && userDataValidator(body)) {

//         if (createNewUser(body)) {
//             res.sendStatus(201)
//         }
//         else {
//             res.sendStatus(409)
//         }
//     }
//     else {
//         res.sendStatus(400);
//     }

// });
// app.put("/updateUser", jsonParser, (req, res) => {
//     const body = req.body;
//     console.log(body);
//     if (body.hasOwnProperty('user_id') && body['user_id'] != null && userDataValidator(body)) {
//         updateUserById(body.user_id, body).then((result) => {
//             console.log(result);
//             res.sendStatus(200);
//         })

//     }
//     else {
//         res.sendStatus(400);
//     }
// });
// app.delete("/deleteUser", (req, res) => {
//     const query = req.query;
//     if (query.hasOwnProperty('id') && query['id'])
//         res.sendStatus(200);
//     else {
//         res.sendStatus(400);
//     }
// })
// app.listen(port, () => {
//     console.log("Server listening at port: ", port);
// });

// function userDataValidator(bodyContent) {
//     let contentValidated =
//         bodyContent.hasOwnProperty('username') && bodyContent['username'] != ""
//         && bodyContent.hasOwnProperty('firstname') && bodyContent['firstname'] != ""
//         && bodyContent.hasOwnProperty('lastname') && bodyContent['lastname'] != ""
//     return contentValidated;
// }


