import 'dotenv/config';
import express from "express"
import { PORT } from "./config.js"
import mongoose from 'mongoose'
import route from './routes/route.js' 
import cors from 'cors'
const app =express()
const MONGODB_URL = process.env.MONGODB_URL;
app.use(express.json())
app.use (cors())
app.get ('/',(req,res)=>{
   
    res.status(206).send ('Welcome to The Store')
})


app.use('/api',route)


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
