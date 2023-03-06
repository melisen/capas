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




module.exports = {
    AllProducts,
    listCategory,
    findById
}