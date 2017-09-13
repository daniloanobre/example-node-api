// Author - Laércio S Bezerra | laercio@assistatecnologia.com.br


/*
 * CONFIGURATION MODEL
 */


// Required libs
const mongoose = require('../config/db');

const Schema = mongoose.Schema;

// Schema
const configurationSchema = new Schema({
  screenName: { type: String, default: 'CineAssista' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

// Export Model for use into Controller
module.exports = mongoose.model('Settings', configurationSchema);
