const mongoose = require('../database/db');
const Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
        type: String,
    },
    interests: {
        type: Array,
    },
    age: {
        type: Number,
    },
    mobile: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const UserDetail = mongoose.model('userdetail', UserSchema);
module.exports = UserDetail;