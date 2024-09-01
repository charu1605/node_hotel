const mongoose=require('mongoose')

// define person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
})

// create person model(for any operation like create,delete,update etc we made this)
const person=mongoose.model('person',personSchema)
module.exports=person;