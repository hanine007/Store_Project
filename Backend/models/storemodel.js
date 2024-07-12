import mongoose from "mongoose";
const location = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim: true // Supprime les espaces en début et en fin de chaîne
         },
         number :{
                type:String,
                required:true,
                trim: true
            
         },
         price :{
            type:Number,
            required:true
         },
         entry_date :{
            type:Date,
            required:true
         
         },
         exit_date :{
            type:Date,
            required:true
         }

    },
    {
        timestamps: true, // Ajoute createdAt et updatedAt automatiquement
      }
);
export const Location =mongoose.model('Location',location)
    
  