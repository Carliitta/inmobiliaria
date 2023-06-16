const { Router } = require("express");
const Propiedad= require("../models/Propiedad");
const route = Router();

route.get("/", async (req,res)=>{
    try {
        const prop= await Propiedad.findAll()
        prop.length?
        res.status(200).send(prop):
        res.status(400).send("no disponible")
    } catch (error) {
        res.status(400).send(error.message)
    }
  
})


module.exports =route