const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log('db en linea');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hoda de inicializar la DB');
    }
}

module.exports = {
    dbConnection
}