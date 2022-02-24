
const mongoose = require('mongoose')

// Geo Schema
const GeoSchema = new mongoose.Schema({
    lat: String,
    lng: String
})

// Address Schema
const AddressSchema = new mongoose.Schema({
    street: String,
    suite: String,
    city: {
        type: String,
        validate: function(value){
            var cityRegex = /^[a-zA-Z\s]*$/
            return cityRegex.test(value)
        }
    },
    zipcode: {
        type: String,
        validate: function(value){
            var zipRegex = /\d{5}-\d{4}/
            return zipRegex.test(value)
        }
    },
    geo: {
        type: GeoSchema,
        required: true
    }
})

// Company Schema
const CompanySchema = new mongoose.Schema({
    name: String,
    catchPhrase: String,
    bs: String
})

// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        validate: function(value){
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
            return emailRegex.test(value)
        }
    },
    address: {
        type: AddressSchema,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: function(value){
            var phoneRegex = /\d{1}-\d{3}-\d{3}-\d{4}/
            return phoneRegex.test(value)
        }
    },
    website: {
        type: String,
        required: true
    },
    company: {
        type: CompanySchema,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User