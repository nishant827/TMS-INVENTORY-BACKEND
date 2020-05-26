const express = require("express");
const router = express.Router();
const itemsDbUtils = require("./items.dbUtils");

router.post("/item/save", (req, res) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit POST /item/save API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    itemsDbUtils.saveOneItem(req.body).then((result) => {
        console.log(`Successfully Saved An Item!`);
        res.send({ status: true, result: { data: result, msg: `Successfully Saved An Item!` } });
    }, (error) => {
        res.status(500).send({ status: false, result: { error: error } });
    });
});

router.get("/item/list", (req, res) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit POST /item/list API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    itemsDbUtils.getItemsList(req.query).then((result) => {
        console.log(`Successfully Fetched Item List!`);
        res.send({ status: true, result: { data: result, msg: `Successfully Fetched Item List!` } });
    }, (error) => {
        res.status(500).send({ status: false, result: { error: error } });
    });
});

module.exports = router;
