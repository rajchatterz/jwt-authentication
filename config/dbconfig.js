
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL
const connectionToDb = ()=>{
    try {
        mongoose.connect(MONGO_URL)
        .then((con)=>{
            console.log(`Connection to the database ${con.connection.host}`)
        })
        .catch((err)=>{
            console.log("Error found in Error",err)
        })
    } catch (error) {
        console.error("Error found in database",error);
    }
}
module.exports=connectionToDb