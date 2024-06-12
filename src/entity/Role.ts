import mongoose from "mongoose";

const role = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    
})

const Role = mongoose.model('Role', role);

module.exports = Role;