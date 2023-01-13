const mongoose = require ('mongoose');

//connection to DB

const conndb = async () =>{
    try {
       await mongoose.connect('mongodb+srv://ala:ala@carsforyou.ubecv3c.mongodb.net/?retryWrites=true&w=majority');
        console.log('You are connected to the DataBase');
    } catch (err) {
        console.log(err);
    }
}

module.exports = conndb;