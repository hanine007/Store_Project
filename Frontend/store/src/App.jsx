//import React from "react";
import { Route,Routes } from "react-router-dom";
import {Show} from'./pages/Show'
import {Home}from'./pages/Home'
import {Edit} from './pages/Edit'
import {Delete}from'./pages/Delete'
import {Create} from'./pages/Creat'
import { Summ } from "./pages/Somme";
const app =()=>{
  return (
    
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create/>}/>
        <Route path="/details/:id" element={<Show />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/sum" element={<Summ />} />
      </Routes>
  )
}
export default app