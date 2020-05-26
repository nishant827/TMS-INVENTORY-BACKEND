module.exports = {
    "required": [
        "name",
        "price",
        "category_id",
        "category_name",
        "description",
        "warranty",
        "discount",
        "manufacturer_name",
        "manufacturer_address",
        "manufacturer_contactNo"
    ],
    "properties": {
        "name": {
            "type": "string",
            "uniqueItems": false
        },
        "price": {
            "type": "number",
            "example": 299,
            "format": "int64",
            "uniqueItems": false
        },
        "category_id": {
            "type": "string",
            "uniqueItems": true
        },
        "category_name": {
            "type": "string",
            "uniqueItems": false
        },
        "description":{
            "type": "string",
            "uniqueItems": false
        },
        "warranty": {
            "type": "number",
            "example": 6,
            "format": "int64",
            "uniqueItems": false
        },
        "discount":{
            "type": "number",
            "example": 25,
            "format": "int64",
            "uniqueItems": false
        },
        "manufacturer_name":{
            "type": "string",
            "uniqueItems": false
        },
        "manufacturer_address":{
            "type": "string",
            "uniqueItems": false
        },
        "manufacturer_contactNo":{
            "type": "string",
            "uniqueItems": false
        },
    }
}