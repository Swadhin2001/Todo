const express = require ('express')
const routes = express.Router()
const model = require ('../model/schema')

// creating middleware
routes.use (express.json())

routes.get('/', (req,res)=>{
    res.send ("Home Page")
})

// GET Request (READ)
routes.get('/get', async (req,res)=>{
    try {
        const data = await model.find()
        res.send (data)
    }
    catch (e){
        console.log (e)
    }
})

// POST Request (CREATE)
routes.post('/post', async(req,res)=>{
    try {
        const data = new model({
            id : req.body.id,
            task : req.body.task,
            strike: req.body.strike,
            edit : req.body.edit,
        })
        await data.save()
        res.send ("data saved")
    }
    catch (e){
        console.log (e)
    }
})

// PUT Request (UPDATE)
routes.put ('/put/:id', async (req,res)=>{
    try {
        const id = req.params.id        
        await model.findOneAndReplace ({id}, {
            id: req.body.id,
            task: req.body.task,
            strike : req.body.strike,
            edit: req.body.edit,
        })
        res.send ("Doc updated")
    }
    catch (e){
        console.log (e)
        res.send("Server Error")
    }
})


// DELETE Request (DELETE)
routes.delete('/delete/:id',async (req,res)=>{
    try{
        const id = req.params.id
        await model.findOneAndDelete({id})
    }
    catch (e){
        console.log (e)
    }
})

//All clear 
routes.delete ('/clearAll', async (req,res)=>{
    try{
        await model.deleteMany ({}) 
    }
    catch (e) {
        console.log (e)
    }
})

module.exports = routes