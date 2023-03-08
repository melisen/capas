const logger = require("../logger/winston-logger")

const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const ProductoSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 10000 },
  category:{ type: String, required: true, max: 100 }
});

const ProdModel = mongoose.model("productos", ProductoSchema);

const AllProducts = async ()=>{
    const productos = await ProdModel.find({});
    const todosProd = productos.map( (item) => (
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

const listCategory = async (categorySelect)=>{
    const categoryProductos = await ProdModel.find({category: categorySelect}).exec()
    return categoryProductos
}

const findById = async (id)=>{
    const prod = ProdModel.findOne({_id:id})
    return prod
}

const saveP = async(objProd)=>{
  const nuevoProd = new ProdModel({
    title: objProd.title,
    price: objProd.price,
    thumbnail: objProd.thumbnail,
    category:objProd.category
  });
    const prodGuardado = await nuevoProd.save()
    logger.log("info", "nuevo producto guardado")
}

const findProdUpdate = async (idprod, newTitle, newPrice, newThumbnail, newCategory)=>{
const modificarProdDB = ProdModel.findOneAndUpdate(
  {_id: idprod},
  {
    title: newTitle,
    price: newPrice,
    thumbnail:newThumbnail,
    category: newCategory
  })
  return modificarProdDB

}

const delProdFromDB = async (idprod)=>{
  const delProd = await ProdModel.deleteOne({_id: idprod})
  return "producto eliminado"
}

module.exports = {
    AllProducts,
    listCategory,
    findById,
    saveP,
    findProdUpdate,
    delProdFromDB
}