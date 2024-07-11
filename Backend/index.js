import 'dotenv/config';
import express from "express"
import { PORT } from "./config.js"
import mongoose from 'mongoose'
import { Location } from './models/storemodel.js';



const app =express()
const MONGODB_URL = process.env.MONGODB_URL;

app.get ('/',(req,res)=>{
   
    res.status(206).send ('Welcome to The Store')
})





//BDD
mongoose.connect(MONGODB_URL).then(()=>{
    console.log('Connected to Mongodb')

})
.catch((error)=>{
    console.log('Error: elle arrive pas a ce connecter',error)

})

app.listen (PORT,()=>{
    console.log (`APP is listing in port ${PORT}`)
})
