const logger = require("../logger/winston-logger");
const {
  getAllProducts,  
  saveNewProd,
  getProduct,
  findProductAndUpdate,
  deleteProdFromDB
    } = require("./productos")

const allProductsAdmin = async ()=>{
    const listaProductos = await getAllProducts();
    const todosProd = listaProductos.map( (item) => (
      {
        _id: item._id,
        title:item.title,
        price:item.price,
        thumbnail:item.thumbnail,
        category:item.category
      }
    ))
    return todosProd
}

const saveProd = async(objProd)=>{
  const guardar = await saveNewProd(objProd);
}

const getProductAdmin = async (idprod)=>{
  const product = await getProduct(idprod)
  return product
}

const updateProd = async (idprod, newTitle, newPrice, newThumbnail, newCategory)=>{
  const productoModificado = findProductAndUpdate(idprod, newTitle, newPrice, newThumbnail, newCategory)
  return productoModificado
}

const deleteProdAdmin = async (idprod)=>{
  try{
    const delProd = await deleteProdFromDB(idprod)
    return delProd;
  }catch(err){
    logger.log("error", err)
  }
  
}

module.exports = {
    allProductsAdmin,
    saveProd,
    getProductAdmin,
    updateProd,
    deleteProdAdmin    
}
