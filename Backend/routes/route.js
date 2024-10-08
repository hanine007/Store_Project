import { Location } from '../models/storemodel.js';
import express from 'express';
import { Router } from 'express';
import { differenceInMonths, addMonths } from 'date-fns';
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
//get all price in this mount

/*
route.get ('/summ',async(req,res)=>{
    try{
        const summ= await Location.aggregate([
            {
                $project: {//extraire juste ls champs necessaire de document de base
                    year: { $year: '$entry_date' },
                  month: { $month: '$entry_date' },// cree champs mouth depuis entry date en utulisant $mounth pour les avoir
                  price: 1 // Inclure le champ price pour l'agrégation suivante
                }
              },
              {
                $group: {// calculer selon les mois et les années
                  _id: { year: "$year", month: "$month" },//clé de groupe par la quelle s'efectue les operations
                  total: { $sum: "$price" }
                }
              },
              {
                $sort: { "_id.year": 1, "_id.month": 1 }  // Optionnel : trier par mois
              }
            ]);
        res.status(200).send(summ)
        }

    


      

    catch(error){
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
})
*/




    














route.get('/summ', async (req, res) => {
    try {
      const summ = await Location.aggregate([
        {
          $addFields: {
            // Calculer le nombre de mois entre entry_date et exit_date
            months: {
              $subtract: [
                { $add: [ { $multiply: [ { $year: "$exit_date" }, 12 ] }, { $month: "$exit_date" } ] },
                { $add: [ { $multiply: [ { $year: "$entry_date" }, 12 ] }, { $month: "$entry_date" } ] }
              ]
            }
          }
        },
        {
          $project: {
            year: { $year: '$entry_date' },
            month: { $month: '$entry_date' },
            price: 1,
            months: 1
          }
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalPrice: { $sum: "$price" },
            totalMonths: { $sum: "$months" } // Somme des mois pour chaque groupe
          }
        },
        {
          $addFields: {
            // Calculer le montant total en multipliant le nombre de mois par le prix total
            totalAmount: { $multiply: ["$totalPrice", "$totalMonths"] }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 } // Optionnel : trier par année et mois
        }
      ]);
      res.status(200).send(summ);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  











export default route;