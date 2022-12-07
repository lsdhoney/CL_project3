let express = require('express');
let app = express();

app.use(express.json());

//DB
let Datastore = require('nedb');
let db = new Datastore('torturer.db');
db.loadDatabase();

app.post('/msgs',(req,res)=>{
    console.log(req.body);
    let obj = {
        msg: req.body.msg
    }
    //test.push(obj);
    //console.log(test);
    db.insert(obj,(err, newDocs)=>{
        if(err) {
            res.json({task: "task failed"});
        } else {
            res.json({task:"success"});
        }

    })
})

app.use(express.static('public'));

app.get('/msgs',(req,res)=>{
    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }
        
    });
    
})

let port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('listening at ', port);
});