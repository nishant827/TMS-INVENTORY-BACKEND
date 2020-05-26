require('dotenv').config(); // to take config values from environment variables
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const config = require("./configurations/config");
const mySqlConfig = require("./dbConfig/mysql.config");
var swaggerDocument = require("./swaggerConfig/swagger");
var cors = require('cors');
const app = express();

(async () => {
    let mysqlConnectionOptions = { host: config.MYSQL_CONFIG.DB_HOST, port: config.MYSQL_CONFIG.DB_PORT, user: config.MYSQL_CONFIG.DB_USER, pass: config.MYSQL_CONFIG.DB_PASS, dbName: config.MYSQL_CONFIG.DB_NAME };
    await mySqlConfig.connectToMySQLDB(mysqlConnectionOptions); // Making db connection

    app.use(cors());
    app.use(bodyParser.json()); // to respond back in json format

    /* Default api */
    app.get('/', (req, res) => {
        let todaysDate = new Date();
        console.log(`${req.headers.host} Hit GET / API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
        res.send(`<h2> Welcome TMS-INVENTORY-BACKEND home! </h2>`);
    });

    /* Swagger documentation implementation with swagger UI available host:port/api-docs */
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Injecting all API's via express router
    app.use(require('./controllers'));

    app.listen(config.APPP_CONFIG.PORT, () => {
        console.log(`APP running on PORT : ${config.APPP_CONFIG.PORT}`);
    });

    /* Will create a super user in the DB */
    if (config.IS_DEFAULT_USER_ENABLE == "1") {
        require("./utils/seeds").createdSuperUser();
    }

})();