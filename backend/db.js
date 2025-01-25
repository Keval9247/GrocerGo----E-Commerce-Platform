const mongoose = require('mongoose')


const connectionMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MonogDB connected...');
    } catch (error) {
        console.error("error conneting db : ", error);
        throw error;
    }
}
module.exports = connectionMongodb