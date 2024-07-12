import { Location } from '../models/storemodel.js';
import express from 'express';
import { Router } from 'express';
const route = Router();
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
return res.status(200).send (app)
     
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
    
})



export default route;