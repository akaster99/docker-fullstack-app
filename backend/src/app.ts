import  express , { Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';

import pool from './db';

const app = express();

app.use(bodyParser.json());

pool.query(`CREATE TABLE lists(
     id INTEGER AUTO_INCREMENT,
     value TEXT,
     PRIMARY KEY(id)
)`,(err:any,result:string,fields:any)=>{
    console.log('results',result)
    if(err){
        console.log('error',err)
    }
})

app.get('/api/values',(req:Request,res:Response)=>{
    pool.query('SELECT * FROM lists',(err:any,results:string,fields:any)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.json(results)
        }
    })
})

app.post('/api/value',(req,res)=>{
    pool.query(`INSERT INTO lists (value) VALUEs("${req.body.value} ")`,(err:any,result:any,fields:any)=>{
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