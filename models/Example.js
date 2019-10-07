const mongoose = require('mongoose');
const Joi = require('joi');
const ExampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});
function validateExample(example) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(example, schema);
}
module.exports.ExampleSchema = ExampleSchema;
module.exports.Example = mongoose.model('Example', ExampleSchema);;
module.exports.validateExample = validateExample;