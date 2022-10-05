const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();

//Port
const PORT = process.env.PORT || 8070;

//db URL
const URL = process.env.MONGODB_URL;

//Routes
const userRoute = require('./routes/api/users');
const userRoute = require('./routes/api/students');
app.use('/users', userRoute);
app.use('/students', userRoute);

app.use(cors());
app.use(bodyParser.json());

//Mongo bd options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true, 
    keepAliveInitialDelay: 300000 
  };

//Connect db
mongoose.connect(URL,options).then(()=>{
    console.log('Mongo server connected');
}).catch(err=>{
    console.log(err.reason);
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongodb connection success");
});

//cors
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



