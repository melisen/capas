const express = require('express');
const {Router} = express;
const adminRouter = Router();
const {    
    allProductsAdminController,
    addProductAdminController,
    //UpdateProductoAdminController,
    //deleteProdAdminController
} = require("../controllers/productos")

adminRouter.get("/",  allProductsAdminController)


adminRouter.post("/", addProductAdminController);

//adminRouter.post("/:id",  UpdateProductoAdminController)
//puesto en el form de vista-productos en botón eliminar
//adminRouter.post("/del/:id",  deleteProdAdminController)



module.exports = adminRouter