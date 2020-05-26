const mysqlController = require("../../dbConfig/mysql.controller");
const config = require("../../configurations/config");

var tables = {
    ITEM_TABLE: config.MYSQL_CONFIG.DB_TABLES.ITEM_TABLE_NAME,
};

var itemsDbUtils = {};

itemsDbUtils.saveOneItem = (itemPayLoad) => {
    return new Promise((resolve, reject) => {
        try {
            let itemInsertQuery = getSaveOneItemQuery(itemPayLoad);
            // console.log(`item insert query : ${itemInsertQuery}`);
            mysqlController.queryToMySqlDB(itemInsertQuery).then((result) => {
                resolve(result);
            }, (error) => {
                if (error.code == "ER_NO_SUCH_TABLE" && error.errno == 1146) {
                    let tableCreationQuery = getItemTableCreationQuery();
                    mysqlController.createTable(tableCreationQuery).then((success) => {
                        itemsDbUtils.saveOneItem(itemPayLoad).then((result) => {
                            resolve(result);
                        }, (error) => {
                            reject(error);
                        });
                    }, (error) => {
                        reject(error);
                    });
                }
                else {
                    console.error(`Error : ${JSON.stringify(error, null, 2)}`);
                    reject(error);
                }
            });
        }
        catch (e) {
            console.error(`Error catched in itemsDbUtils.saveOneItem method : ${e}`);
            reject(e);
        }
    });
}

itemsDbUtils.getItemsList = (queryParams) => {
    return new Promise((resolve, reject) => {
        try {
            let itemsGetListQuery = `SELECT * FROM ${tables.ITEM_TABLE} LIMIT ${+queryParams.limit} OFFSET ${+queryParams.offset}`
            // console.log(`items get query : ${itemsGetListQuery}`);
            mysqlController.queryToMySqlDB(itemsGetListQuery).then((result) => {
                resolve(result);
            }, (error) => {
                if (error.code == "ER_NO_SUCH_TABLE" && error.errno == 1146) {
                    let tableCreationQuery = getItemTableCreationQuery();
                    mysqlController.createTable(tableCreationQuery).then((success) => {
                        itemsDbUtils.getItemsList(queryParams).then((result) => {
                            resolve(result);
                        }, (error) => {
                            reject(error);
                        });
                    }, (error) => {
                        reject(error);
                    });
                }
                else {
                    console.error(`Error : ${JSON.stringify(error, null, 2)}`);
                    reject(error);
                }
            });
        }
        catch (e) {
            console.error(`Error catched in itemsDbUtils.saveOneItem method : ${e}`);
            reject(e);
        }
    });
}

/******************  HELPER's *********************/

function getSaveOneItemQuery(itemPayLoad) {
    let itemId = require("uuid").v1();
    return `INSERT INTO ${tables.ITEM_TABLE} 
    (id, name, category_id, category_name, price, description, warranty, discount, status,quantity,
    manufacturer_name, manufacturer_address, manufacturer_contactNo) 
    VALUES ('${itemId}','${itemPayLoad.name}','${itemPayLoad.category_id}','${itemPayLoad.category_name}',
    ${+itemPayLoad.price},'${itemPayLoad.description}',${+itemPayLoad.warranty},${+itemPayLoad.discount},
    ${+itemPayLoad.status},${+itemPayLoad.quantity},'${itemPayLoad.manufacturer_name}',
    '${itemPayLoad.manufacturer_address}','${itemPayLoad.manufacturer_contactNo}')`;
}

function getItemTableCreationQuery() {
    return `CREATE TABLE ${tables.ITEM_TABLE} 
    (
    id VARCHAR(50) NOT NULL, name VARCHAR(100) NOT NULL,category_id VARCHAR(5) NOT NULL,
    category_name VARCHAR(45) NOT NULL, price INT NOT NULL, description VARCHAR(200) NULL,
    warranty INT NOT NULL DEFAULT 0, discount INT NOT NULL DEFAULT 0,status INT NOT NULL DEFAULT 1,
    quantity INT NOT NULL DEFAULT 1,manufacturer_name VARCHAR(65) NULL, manufacturer_address VARCHAR(200) NULL, 
    manufacturer_contactNo VARCHAR(10) NULL,
    PRIMARY KEY (id)
    )`;
}

module.exports = itemsDbUtils;