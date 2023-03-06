const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

const ProductoAlCarrito = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true, max: 10000 },
  quantity: { type: Number, required: true }
});

const CarritoSchema = new mongoose.Schema({
    productos: [ProductoAlCarrito],
},
{ timestamps: true });

const CarritoModel = mongoose.model("carritos", CarritoSchema);


/*const childSchema = new Schema({ name: 'string' });
const parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments
  child: childSchema
});
*/


const newCart = async ()=>{
  const nuevoCarrito = new CarritoModel({
    productos: []
  });
  const objCarrito = await nuevoCarrito.save()
  const id =  objCarrito._id
  return id
}    

const listAll = async ()=>{
  const todos = await CarritoModel.find({})
  return todos
}

const getProductList = async (id)=>{
  const carrito = await CarritoModel.findOne({_id: id});
  if(carrito){
    const productos = carrito.productos;
    const productosMap = productos.map( (item) => (
      {
        _id: item._id,
        title:item.title,
        price:item.price,
        thumbnail:item.thumbnail,
        quantity:item.quantity,
      }
    ))
    return productosMap 
  }else{
    return false
  }
     
}



const findById =  async (_id)=>{
const element = await CarritoModel.findOne({_id: _id});
return element
}


const AddProdToCart = async (objetoProd, id)=>{
const carritoActualizado = await CarritoModel.findOneAndUpdate(
  {_id: id},
  { $push: {productos: objetoProd}},
  { new: true}) 
  return carritoActualizado
  //set the new option to true to return the document after update was applied.

}

const deleteCartById = async (id)=>{
let carritoEliminado = await CarritoModel.deleteOne({ _id: id })
}

const findProdInCart = async (idcarrito, idProd)=>{
const carrito = await CarritoModel.findOne({_id: idcarrito})
const arrProductos = carrito.productos;   
const estaProducto = arrProductos.find(element => element._id == idProd)
return estaProducto
}

const addRepeatedProd = async (idProd, cantPrevia, cantSumar, idcarrito)=>{
const nuevaCant = cantPrevia + cantSumar;
const carrito = await CarritoModel.findOne({_id: idcarrito})
const arrProductos = carrito.productos;   
  arrProductos.find(element => element._id == idProd).quantity = nuevaCant
  const cantActualizada = await CarritoModel.findOneAndUpdate(
    {_id: idcarrito},
    { $set: {productos: arrProductos}},
    { new: true}) 
    //const importeTotal = arrProductos.reduce((acc, elemento) => acc + elemento.price*elemento.quantity, 0)
}


const deleteProd = async (id, idprod)=>{
const carrito = await CarritoModel.findOne({_id: id})
const arrProductos = carrito.productos;
try{
  const nuevoArr = arrProductos.filter(element => element._id != idprod)
  const carritoActualizado = await CarritoModel.findOneAndUpdate(
    {_id: id},
    { $set: {productos: nuevoArr}},
    { new: true}) 
}        
  catch(err){
    logger.log("error", "no se pudo eliminar producto del carrito ")
  }
}


module.exports = {
newCart,
listAll,
findById,
AddProdToCart,
deleteCartById,
getProductList,
findProdInCart,
addRepeatedProd,
deleteProd

}
