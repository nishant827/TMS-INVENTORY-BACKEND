const mysql = require("mysql");
var mysqlConnection = null;
var mysqlConfig = {};

mysqlConfig.connectToMySQLDB = async (connectionOptions) => {
    try {
        mysqlConnection = mysql.createConnection({
            host: connectionOptions.host,
            port: connectionOptions.port,
            user: connectionOptions.user,
            password: connectionOptions.pass,
            database: connectionOptions.dbName
        });

        mysqlConnection.connect(function (err) {
            if (err) {
                /* If the DB does not exists ... */
                if (err.code == "ER_BAD_DB_ERROR" && err.errno == 1049) {
                    createDB(connectionOptions);
                }
                else {
                    console.error(`MySQL DB -> connection error on ${connectionOptions.host}:${connectionOptions.port} details->${err}`);
                    process.exit(-1);
                }
            }
            else {
                console.log(`------------------------------------------------------------------`);
                console.log(`MySQL DB -> connection established on ${connectionOptions.host}:${connectionOptions.port} with ID : ${mysqlConnection.threadId}`);
                console.log(`------------------------------------------------------------------`);
            }
        });

    }
    catch (e) {
        console.error(`MySQL DB -> connection error on ${connectionOptions.host}:${connectionOptions.port} details->${e}`);
        process.exit(-1);
    }
}

mysqlConfig.getMySqlDBConnection = () => {
    return mysqlConnection;
}

function createDB(dbOptions) {
    let con = mysql.createConnection({
        host: dbOptions.host,
        port: dbOptions.port,
        user: dbOptions.user,
        password: dbOptions.pass
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query(`CREATE DATABASE ${dbOptions.dbName}`, function (err, result) {
            if (err) {
                console.error(`MySQL DB ---> creation error on ${dbOptions.host}:${dbOptions.port} details->${err}`);
                process.exit(-1);
            }
            else {
                con.end(); // end this particular connection ...
                console.log(`${dbOptions.dbName} Database created`);
                mysqlConfig.connectToMySQLDB(dbOptions);
            }
        });
    });

}

module.exports = mysqlConfig;
