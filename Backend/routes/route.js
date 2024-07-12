import { Location } from '../models/storemodel.js';
import express from 'express';
import { Router } from 'express';
const route = Router();
//post 
route.post ('/app',async (req,res)=>{
    try{
        if(
            !req.body.name||
            !req.body.number||
            !req.body.price||
            !req.body.entry_date||
            !req.body.exit_date
            
        )
        {
        return res.status(400).send ({
            message:'All fields are required'
        })
          }

    const newapp={
    name:req.body.name,
    number:req.body.number,
    price:req.body.price,
    entry_date:req.body.entry_date,
    exit_date:req.body.exit_date

    }
    const app = await Location.create(newapp)
    return res.status(200).send (newapp)
     
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
    
})
//get all
route.get('/app',async(req,res)=>{
    try{
        const apps= await Location.find({})
        return  res.status(200).json({
            count: apps.length,
            data: apps
        })

    }
  
    catch(error){
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }

})
//get one 
route .get ('/app/:id',async(req,res)=>{
    try {
        const app = await Location.findById(req.params.id)
        return res.status(200).json({
            data:app
        })
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
})
//update 
route.put('/app/:id',async(req,res)=>{
    try{
        if (!req.body.name||
            !req.body.number||
            !req.body.price||
            !req.body.entry_date||
            !req.body.exit_date
            )
            {
                return res.status(400).send({
                    message:'All fields are required'
                })
            }
            const result= await Location.findByIdAndUpdate(req.params.id,req.body)
            if(!result){
                return res.status(404).send({
                    message:'App not found'
                })
            }
            return res.status(200).send({
                message:'App updated successfully'
            })
        
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
})
//Delete
route.delete('/app/:id',async(req,res)=>{
    try{
        const supp= await Location.findByIdAndDelete(req.params.id) 
        if(!supp){
            return res.status(404).send({
                message:'App not found'
            })
        }
        res.status(200).send({ message: 'Book deleted successfully' })
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
})
export default route;