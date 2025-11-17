const AJV = require("ajv");
const schema = {
    "type":"object",
    "properties":{
        "fn":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$"
        },
        "ln":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$"
        },
        "dept":{
            "type":"string",
            "enum":["CS","ES","DS"],
            "maxLength":2,
            "minLength":2,
        },
        "age":{
            "type":"number",
        }
    },
    "required":["age","fn","ln","dept"],
}
const ajv = new AJV();
module.exports = ajv.compile(schema);