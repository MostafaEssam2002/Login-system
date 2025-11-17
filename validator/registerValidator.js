const AJV = require("ajv");
const ajv = new AJV();
const schema = {
    "type":"object",
    "properties":{
        "name":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$"
        },
        "email":{
            "type":"string","pattern":"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        },
        "password":{
            "type":"string","minLength":5
        },
        "isAdmin": {
            "type": "boolean"
        }

    },
    "required":["name","email","password"]
}
module.exports = ajv.compile(schema);