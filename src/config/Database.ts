const mongoose = require('mongoose')

class Database {
    constructor(){}

    connectDb = async() => {
        try {
            await mongoose.connect(process.env.URL_DB)
            console.log('Connected to MongoDB');
        } catch(err) {
            console.error('Error connecting to MongoDB:', err);
        }
    }
}

export default Database;