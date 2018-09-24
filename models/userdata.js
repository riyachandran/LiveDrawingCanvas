const mongoose=require('mongoose');

const UserdataSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const Userdata=module.exports=mongoose.model('Userdata',UserdataSchema);
