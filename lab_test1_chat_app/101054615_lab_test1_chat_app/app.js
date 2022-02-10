/*
Student ID: 101054615
Sheak Iftakhar Rahaman
*/

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
const WebSocket = require('ws')

// const wss = new WebSocket.Server({ port: 8080 })

// function reload(){
//     wss.on('connection', ws => {
//         ws.on('message', message => {
//         })
//         ws.send('Hello! Message From Server!!')
//       });
// }


app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
    secret:'101054615',
    resave:false,
    saveUninitialized:false
}));
const uri = "mongodb+srv://chat:ChatApp@comp3123.yc82l.mongodb.net/chatApp?retryWrites=true&w=majority";

mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to database !!');
    })
    .catch((err)=>{
      console.log('Connection failed !!'+ err.message);
    });

const userSchema  = {
    username:String,
    fname:String,
    lname:String,
    password:String,
    createon:Date
}
const msgSchema = {
    fromUser:String,
    toUser:String,
    room:String,
    message:String,
    date_sent:Date
}

const roomSchema = {
    name:String,
    members:[String]
}

const User = new mongoose.model("User",userSchema);
const msg = new mongoose.model("msg",msgSchema);
const room = new mongoose.model("room",roomSchema);



app.get('/',function(req,res){

    room.find({}, function(err, room) {
        if (err){
            console.log(err);
        }else{ 
            res.render('index',{set:room});
            }
        });
});

app.get('/reg',function(req,res){
    res.render("reg");
});

app.post('/main',function(req,res){
    let date = new Date();
    const newMsg = new msg({
        fromUser: req.session.loggedUser,
        room: req.session.room,
        message: req.body.msg,
        date_sent:date,
        toUser:req.body.toUser
    });
    const roomt = req.session.room;
    
    newMsg.save(function(err){
        if(err){
            console.log(err);
        }else{
            msg.find({"room":roomt}, function(err, msgs) {
                if (err){
                    console.log(err);
                }else{ 
                    room.find({"name":roomt},function(err,rooms){
                        if(err){
                            console.log(err);
                        }else{
                            res.render('main', { name: req.session.loggedUser,data: msgs,roomt,room:rooms[0].members});
                        }
                    })
                    }
                });
        }
    })
});

app.get('/main',function(){
    if(req.session.loggedUser === undefined){
        room.find({}, function(err, room) {
            if (err){
                console.log(err);
            }else{ 
                res.render('index',{set:room});
                }
            });
    }else{
        { 
            roomt = req.session.room;
            room.find({"name":roomt},function(err,rooms){
                if(err){
                    console.log(err);
                }else{
                    res.render('main', { name: req.session.loggedUser,data: msgs,roomt,room:rooms[0].members});
                }
            })
            }
    }
});

app.post('/reg',function(req,res){
    let date = new Date();
    const newUser = new User({
        username:req.body.uname,
        fname:req.body.fname,
        lname:req.body.lname,
        password:req.body.pass,
        createon:date
    });
    room.count({name:req.body.roomName},(err,res)=>{

        if(err){
            console.log(err);
        }else{
            if(res === 0){
                let newRoom = new room({
                    name:req.body.roomName,
                    members: [req.body.uname]
                });
                newRoom.save(function(err,res){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(res);
                    }
                });
            }
            else{
                room.findOneAndUpdate({"name":req.body.roomName}, {$push: {members: req.body.uname}},{new: true}, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    console.log(doc);
                });
            }
        }
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            msg.find({"room":req.body.roomName}, function(err, msgs) {
                if (err){
                    console.log(err);
                }else{
                    
                    req.session.loggedUser = req.body.uname;
                    req.session.room = req.body.roomName;
                    roomt = req.body.roomName;

                    room.find({"name":roomt},function(err,rooms){
                        if(err){
                            console.log(err);
                        }else{
                            res.render('main', { name: req.session.loggedUser,data: msgs,roomt,room:rooms[0].members});
                        }
                    })
                    }
                });
        }
    })
});

app.post('/index',function(req,res){
    const username = req.body.username;
    const passw = req.body.pass;
    const roomt = req.body.Room;

    User.findOne({username:username},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if (foundUser.password === passw){
                    logUser = foundUser.fname;
                    msg.find({"room":req.body.Room}, function(err, msgs) {
                        if (err){
                            console.log(err);
                        }else{
                            req.session.loggedUser = foundUser.username;
                            req.session.room = roomt;
                            room.find({"name":roomt},function(err,rooms){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.render('main', { name: req.session.loggedUser,data: msgs,roomt,room:rooms[0].members});
                                }
                            })
                            }
                        });
                }else{
                    console.log("Password wrong");
                    room.find({}, function(err, room) {
                        if (err){
                            console.log(err);
                        }else{ 
                            res.render('index',{set:room});
                            }
                        });
                }
            }else{
                console.log("No user found");
                room.find({}, function(err, room) {
                    if (err){
                        console.log(err);
                    }else{ 
                        res.render('index',{set:room});
                        }
                    });
            }
        }
    })
});

app.post('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err){
            console.log(err);
        }
      })
      room.find({}, function(err, room) {
        if (err){
            console.log(err);
        }else{ 
            res.render('index',{set:room});
            }
        });
});

app.listen(3000,function(){
    console.log("run on port 3000");
});