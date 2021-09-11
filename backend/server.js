const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

const app = express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists(
     id INTEGER AUTO_INCREMENT,
     value TEXT,
     PRIMARY KEY(id)
)`,(err,result,fields)=>{
    console.log('results',result)
    if(err){
        console.log('error',err)
    }
})

app.get('/api/values',(req,res)=>{
    db.pool.query('SELECT * FROM lists',(err,results,fields)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.json(results)
        }
    })
})

app.post('/api/value',(req,res)=>{
    db.pool.query(`INSERT INTO lists (value) VALUEs("${req.body.value} ")`,(err,result,fields)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.json({success: true, value: req.body.value}) 
        }
    })
})

app.listen(5000,()=>{
    console.log('server running on port 5000')
})