const config = require('./src/config/env.config');
const router = require('./src/api/v1/router');
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

//DB Connection
async function ConnectionToDB() {
    await mongoose.connect(`${config.db_dialect}://${config.db_host}:${config.db_port}/${config.db_name}`, { useNewUrlParser: true, useUnifiedTopology: true });
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

