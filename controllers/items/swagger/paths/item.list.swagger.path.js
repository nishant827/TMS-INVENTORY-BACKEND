module.exports = {
    "get": {
        // "security": [{ "authorization": [] }],
        "tags": [
            "ITEM"
        ],
        "summary": "Fetches all items in system",
        "description": "Fetches all items in system",
        "parameters": [{
            "name": "offset",
            "in": "query",
            "required": true,
            "type": "number"
        },
        {
            "name": "limit",
            "in": "query",
            "required": true,
            "type": "number"
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Items fetched successfully"
            },
            "500": {
                "description": "Error occured while fetching the Items"
            }
        }
    }
}