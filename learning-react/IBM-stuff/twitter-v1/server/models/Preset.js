var mongoose = require('mongoose');

var PresetSchema = mongoose.Schema;

var PresetSchema = new Schema({
    id: Number,
    time: Number,

    sentiment: Number,
    sentFlux: Number,
    sentTimeRelease: Number,

    stock: Number,
    stockFlux: Number,
    stockTimeRelease: Number,
});

// Compile model from schema
var PresetModel = mongoose.model('PresetModel', PresetSchema);
