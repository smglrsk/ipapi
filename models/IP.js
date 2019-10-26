const mongoose = require('mongoose')
const validator = require('validator')

const ipSchema = mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    continent_code: {
        type: String
    },
    continent_name: {
        type: String
    },
    country_code: {
        type: String
    },
    country_name: {
        type: String
    },
    region_code: {
        type: String
    },
    region_name: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    location_geoname_id: {
        type: Number
    },
    location_capital: {
        type: String
    },
    location_languages: {
        type: String
    },
    location_country_flag: {
        type: String
    },
    location_country_flag_emoji: {
        type: String
    },
    location_country_flag_emoji_unicode: {
        type: String
    },
    location_calling_code: {
        type: String
    },
    location_is_eu: {
        type: Boolean
    }
})


const IP = mongoose.model('IP', ipSchema)

module.exports = IP