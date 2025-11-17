const Ajv = require("ajv");
// const validate = AJV.compile(Schema);
const AJV = new Ajv();
const Schema = {
    type:"object",
    properties:{
        name:{type:"string",maxLength:15,minLength:3},
        age:{type:"number"},
    },
    required:["name","age"],
    additionalProperties:false,
}
const validate = AJV.compile(Schema);
module.exports = validate;