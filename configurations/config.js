module.exports = {
    APPP_CONFIG: {
        PORT: process.env.APP_PORT || 4040,
        HOST: process.env.APP_HOST || "localhost"
    },
    MYSQL_CONFIG: {
        DB_NAME: process.env.MYSQL_DB_NAME || "tms_poc_inventory",
        DB_HOST: process.env.MYSQL_DB_HOST || "localhost",
        DB_USER: process.env.MYSQL_DB_USER || "root",
        DB_PASS: process.env.MYSQL_DB_PASS || "root",
        DB_PORT: process.env.MYSQL_DB_PORT || "3306",
        DB_TABLES: {
            ITEM_TABLE_NAME: process.env.ITEM_TABLE_NAME || "items"
        }
    },
    SWAGGER_CONFIG: {
        SWAGGER: process.env.SWAGGER_SWAGGER || "2.0",
        INFO: {
            VERSION: process.env.SWAGGER_INFO_VERSION || "1.0.0",
            TITLE: process.env.SWAGGER_INFO_TITLE || "TMS Invetory Backend",
            DESCRIPTION: process.env.SWAGGER_INFO_DESCRIPTION || "A POC on TWS (Tower Management System) Inventory system"
        },
        HOST: `${process.env.APP_HOST}:${process.env.APP_PORT}` || "localhost:4040",
        BASEPATH: process.env.SWAGGER_BASEPATH || "/api",
        SCHEMES: process.env.SWAGGER_SCHEMES_HTTP && process.env.SWAGGER_SCHEMES_HTTPS ? [process.env.SWAGGER_SCHEMES_HTTP, process.env.SWAGGER_SCHEMES_HTTPS] : ["http", "https"],
        CONSUMES: process.env.SWAGGER_CONSUMES ? [process.env.SWAGGER_CONSUMES] : ["application/json"],
        PRODUCES: process.env.SWAGGER_PRODUCES ? [process.env.SWAGGER_PRODUCES] : ["application/json"],
    }
}