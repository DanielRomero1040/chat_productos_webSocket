const express = require("express");
const contenedor = require ('../manejo-archivos');
const newContainer = new contenedor.Contenedor;

const {Router} = express;

const router =  new Router();


//----------------------------------------

router.get("/",(req,res)=>{
    res.sendFile("public/index.html", {root: "."})
})

//----------------------------------------
module.exports = router;
