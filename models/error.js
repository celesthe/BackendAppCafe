const {Schema, model} = require('mongoose');


const error = Schema({
    nivelError: {
        type: String
    },
    error: []
});

module.exports = model('error', error);