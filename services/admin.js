const logger = require("../logger/winston-logger");
const {  
   
    } = require("./productos")

const allProductsAdmin = async ()=>{
    const listaProductos = await AllProducts();
    const todosProd = listaProductos.map( (item) => (
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


module.exports = {
    allProductsAdmin    
}
