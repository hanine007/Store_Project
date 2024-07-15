//import React from "react";
import { Route,Routes } from "react-router-dom";
import {Show} from'./pages/Show'
import {Home}from'./pages/Home'
const app =()=>{
  return (
    
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Show" element={<Show />} />
      </Routes>
  )
}
export default app