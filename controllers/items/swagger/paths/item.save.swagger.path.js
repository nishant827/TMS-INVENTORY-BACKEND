module.exports = {
    "post": {
        // "security": [{ "authorization": [] }],
        "tags": [
            "ITEM"
        ],
        "summary": "Saves a new item in system",
        "description": "Saves a new item in system",
        "parameters": [{
            "name": "item",
            "in": "body",
            "description": "ITEM that we want to save",
            "schema": {
                "$ref": "#/definitions/Item"
            }
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "New Item is saved"
            },
            "500": {
                "description": "Error occured in saving item"
            }
        }
    }
}