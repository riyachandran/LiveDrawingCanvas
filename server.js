var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var cors=require('cors');
var bodyparser=require('body-parser');

var app=express();
var http=require("http").Server(app);
var io=require('socket.io').listen(http);

io.on("connection",function(socket){
    socket.on("square",function(data){
        socket.broacast.emit("square",data);
    });
    socket.on("draw begin path",function(){
        socket.broacast.emit("draw begin path");
    })
})

var port=3000;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/livedrawingcanvas');

//on connection
mongoose.connection.on('connected',function(){
    console.log('connected to mongodb');
});

mongoose.connection.on('error',function(err){
    if(err){
        console.log('error: '+err)
    }
});

//view engine
// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','ejs');
// app.engine('html',require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//adding middleware - cors
app.use(cors());

//Body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

var route=require('./routes/route');
app.use('/api',route);
http.listen(port,function(){
    console.log('Server started on port '+port);   
    app.get('env') ;
});