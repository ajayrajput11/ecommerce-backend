const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected");
        
    } catch (error) {
        console.log("Error in DB connection", error);
        process.exit(1);
    }
}
module.exports ={connectDB};