const mongoose = require('mongoose');
const config = require('./src/config/env.config');
//DB Connection

mongoose.connect(`${config.db_dialect}://${config.db_user}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_name}`, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error',()=>console.error("Error during DB connection"));
db.once('open',()=>{
    console.log("DB connected");
})

exports.db;
