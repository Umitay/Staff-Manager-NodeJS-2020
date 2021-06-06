const config = require('config')
const MongoClient = require('mongodb').MongoClient;

const DBService = function () {

    let connection = null;
    let instance = 0;

    async function connect() {
        try {
            const client = await MongoClient.connect(config.get('mongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            return client
        } catch (e) {
            return e;
        }
    }

    async function Get() {
        try {
            instance++;
            console.log(`DbConnection called ${instance} times`);

            if (connection != null) {
                console.log(`db connection is already alive`);
                return connection;
            } else {
                console.log(`getting new db connection`);
                connection = await connect();
                console.log(`connected`);
                return connection;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}


module.exports = DBService();