const mongoose = require('mongoose')


const connectionMongodb = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const response = await mongoose.connect(process.env.MONGO_URL);
        // console.log("response",response);
    } catch (error) {
        console.log("error conneting db : ", error);
        throw error;
    }
}
module.exports = connectionMongodb