const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  edad: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  telefono: { type: String, required: true, max: 100 },
  avatar: { type: String, required: true, max: 10000 },
  carritoactual:{ type: String, required: true}
});
const Usuarios = mongoose.model("usuarios", UsuarioSchema);

const findByUsername = async (username)=>{
  const user = await Usuarios.findOne({username: username})
  return user
}

const createUser = async (obj)=>{
  const newUser = await Usuarios.create(obj);
  //return newUser
}

const findUserById = async (id)=>{
  const user = await Usuarios.findById(id);
  return user
}
const addCartIdToUser = async (username, id)=>{
  const usuario = await Usuarios.findOneAndUpdate(
     {username: username},
     { $set: {carritoactual: id}})
     return usuario
     // The $set operator replaces the value of a field with the specified value. 
     // para cambiar si fuera un array de ids de carritos -->{ $push: {carritos: objCarrito._id}})      
   
 }

 const updateSetEmptyCart = async (username)=>{
  const emptyCart = await Usuarios.findOneAndUpdate(
    {username: username},
    { $set: {carritoactual: "vacío"}})
  }

module.exports = {
  Usuarios,
  findByUsername,
  createUser,
  findUserById,
  addCartIdToUser,
  updateSetEmptyCart
}
