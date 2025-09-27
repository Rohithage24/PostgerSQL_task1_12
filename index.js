import express from "express";
import server from "./app.js";

const port = process.env.PORT || 8754;


// server.get("/",(req, res)=>{
//   return res.send("Hello...")  
// })


server.listen(port , ()=>{
    console.log(`Server is Start PORT : ${port}`);
    
})