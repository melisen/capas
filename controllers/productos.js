
const logger = require("../logger/winston-logger")
const {
    getAllProducts,
    filterByCategory,
    getProduct,
    //keepShopping,
    allProductsAdmin
  } = require ("../services/productos")
  


  const allProductsController = async (req, res)=>{
    const user = req.user;
    const id = user.carritoactual;
    //const idValido = mongoose.Types.ObjectId.isValid(id)
    //console.log("allProductsController", idValido)
    const todosProd = await getAllProducts()
    res.render("nuestros-productos", {data: {id}}) 
    logger.log("info", "/api/productos - GET  allProductsController")
  }

  const postCategoryController = async (req, res)=>{
    const {category} = req.body;
    res.redirect(`/api/productos/${category}`)
  }

  const filterByCategoryController = async (req, res)=>{
    const user = req.user;
    const id = user.carritoactual; 
    const {category} = req.params    
    const todosProd = await filterByCategory(category)
    res.render("nuestros-productos", {data:{ category, id, todosProd}})
    logger.log("info", "/api/productos/:category - GET  filterByCategoryController")
  }

  const postCategoryAndProdController = async (req, res)=>{
    const {idprod} = req.body;
    const {categoryname} = req.body;
    const category = categoryname
    logger.log("info", "/api/productos/:category - POST  postCategoryAndProdController")
    res.redirect(`/api/productos/${category}/${idprod}`)   
    }

    const getProductController = async (req, res)=>{
      
        const {id} = req.params;
        console.log("id params", (id))
        const prod = await getProduct(id)
        const idcarrito = req.user.carritoactual
        res.render("detalle-producto", {data:{idcarrito, prod}})
        logger.log("info", "/api/productos/:category/:id - GET  getProductController")
      }
    
    const keepShoppingController = async (req, res)=>{ 
        const user = req.user;
        const carrito = user.carritoactual; 
        if(carrito != "vacío"){             
        res.redirect("/api/productos")
        logger.log("info", "/api/productos/seguir-comprando - GET  keepShoppingController")
        }
        else{
            res.redirect("/api/carrito")
        }
      }
    
    const allProductsAdminController = async (req, res)=>{
      console.log("llega allProductsAdminController")
        const { username, password, nombre } = req.user;
        const user = { username, password, nombre };
        const productos = await allProductsAdmin()
        
        res.render("vista-productos", {user, productos});
      }

/*
      const addProductAdminController = async (req, res)=>{

      }

      const UpdateProductoAdminController = async (req, res)=>{

      }

      const deleteProdAdminController = async (req, res)=>{

      }
      */

module.exports = {
  allProductsController,
  postCategoryController,
  filterByCategoryController,
  postCategoryAndProdController,
  getProductController,
  keepShoppingController,
  allProductsAdminController,
    //addProductAdminController,
    //UpdateProductoAdminController,
    //deleteProdAdminController
}


