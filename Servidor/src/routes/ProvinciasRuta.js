const { Router } = require("express");
const Provincias = require("../models/Provincias");
const route = Router();

route.get("/", async (req,res)=>{
    try {
        const prov= await Provincias.findAll()
        prov.length?
        res.status(200).send(prov):
        res.status(400).send("No se encontraron provincias")
    } catch (error) {
        res.status(400).send(error.message)
    }
  
})


module.exports =route