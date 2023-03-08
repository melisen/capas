const logger = require("../logger/winston-logger");
const {  
    findById,
    AllProducts,
    listCategory,
    saveP,
    findProdUpdate,
    delProdFromDB
    } = require("../models/productos")
const { findUser} = require("./usuarios")

const getAllProducts = async()=>{
    const todos = await AllProducts()
    return todos
}

const filterByCategory = async (category)=>{
  try{           
      if(category=="todos"){
        const productos = await AllProducts();
        const todosProd = productos.map( (item) => (
          {
            id: item._id,
            title:item.title,
            price:item.price,
            thumbnail:item.thumbnail,
            category:item.category
          }
        ))
        return todosProd
      } else{
        const productos = await listCategory(category);
        const todosProd = productos.map( (item) => (
          {
            id: item._id,
            title:item.title,
            price:item.price,
            thumbnail:item.thumbnail,
            category:item.category
          }
        ))
        return todosProd            
      }
    }
    catch(err){
      logger.log("error", "/api/productos/:category -  GET  - error al mostrar catálogo por categoría")
    }
}

const getProduct = async (id)=>{
    const producto = await findById(id);
    const prod = {
    title: producto.title,
    thumbnail: producto.thumbnail,
    price: producto.price,
    _id: id,
    category:producto.category
    }
    return prod
}

const findCurrentCart = async (username)=>{
    const usuario = await findUser(username)
    const haycarrito = usuario.carritoactual;
    return haycarrito;
}

const keepShopping = async (username) =>{
    const haycarrito = await findCurrentCart(username);        
        if(haycarrito == "vacío"){
          return "vacío"
        }else{
          try{
            const productos = await AllProducts();
            const todosProd = productos.map( (item) => (
              {
                _id: item._id,
                title:item.title,
                price:item.price,
                thumbnail:item.thumbnail,
                category:item.category
              }
            ))
            logger.log("info", "/api/productos/seguir-comprando - GET")  
            return todosProd
          }
          catch(err){
            logger.log("error", "/api/productos/seguir-comprando -  GET  - error al mostrar catálogo de productos")
          }
        }
}

const saveNewProd = async(objProd)=>{
  const saveInDB = await saveP(objProd)
}

const findProductAndUpdate = async (idprod, newTitle, newPrice, newThumbnail, newCategory)=>{
  const modifProd = await findProdUpdate(idprod, newTitle, newPrice, newThumbnail, newCategory)
  return modifProd
}

const deleteProdFromDB = async (idprod)=>{
  const productoEliminado = await delProdFromDB(idprod)
  return productoEliminado
}

module.exports = {
    getAllProducts,
    filterByCategory,
    getProduct,
    keepShopping,
    findCurrentCart,
    saveNewProd,
    findProductAndUpdate,
    deleteProdFromDB    
}
