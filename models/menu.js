const mongoose=require('mongoose');
const menuitem=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        Enum:['spicy','sweet','sour']
    },
    isdrink:{
        type:Boolean,
        default:false
    },
    ingridient:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0 
    }

})
const menu=mongoose.model('menu',menuitem);
module.exports=menu;
