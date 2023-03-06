
const logger = require("../logger/winston-logger")
const {
    allProductsAdmin
  } = require ("../services/admin")

        const allProductsAdminController = async (req, res)=>{
      console.log("llega allProductsAdminController")
        const { username, password, nombre } = req.user;
        const user = { username, password, nombre };
        const productos = await allProductsAdmin()        
        res.render("vista-productos", {user, productos});
      }

      const addProductAdminController = async (req, res)=>{
    const newProd = {
      category: req.body.category,
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    }
      const save = saveProd(newProd)
      }
/*
      const UpdateProductoAdminController = async (req, res)=>{

      }

      const deleteProdAdminController = async (req, res)=>{

      }
      */

module.exports = {
  allProductsAdminController,
    //addProductAdminController,
    //UpdateProductoAdminController,
    //deleteProdAdminController
}


