let express = require('express');
let app = express();

const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://yc:connect@cluster0.degfsdk.mongodb.net/?retryWrites=true&w=majority");

db.on("ready", () => {
    console.log("Connected to the database");
    
});

db.connect(); 

app.use(express.json());

//let test = [];

app.post('/msgs',(req,res)=>{
    console.log(req.body);
    let obj = {
        msg: req.body.msg
    }
    //test.push(obj);
    //console.log(test);
    db.push("msgData", obj);
    res.json({task:"success"});
})

app.use(express.static('public'));
let port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('listening at ', port);
});

app.get('/msgs',(req,res)=>{
    db.get("msgData").then(mData =>{
        let obj = {data:mData};
        res.json(obj);
        
    });
    
})
