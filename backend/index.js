require ('dotenv').config()
const express = require ('express')
const mongoose = require ('mongoose')
const route = require ('./routes/routes')
const cors = require('cors');
const app = express ()
const port = process.env.port || 4000

// CORS policy acceptance
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));

app.use ('/', route)
app.use ('/get', route)
app.use ('/post', route)
app.use ('/delete', route)
app.use ('/put', route)
app.use ('/clearAll',route)

const start = async ()=>{
    try{
        await mongoose.connect(process.env.MongoURI)
        app.listen (port , ()=>{
            console.log (`Successfully running on http://localhost:${port}`)
        })
    }
    catch (e){
        console.log (e)
    }
}

start()