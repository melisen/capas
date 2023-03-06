const {findByUsername, addCartIdToUser, updateSetEmptyCart } = require("../models/usuarios")
const {sendNewRegisterToAdmin} = require("../external-services/nodemailer")

const findUser = async (username)=>{
  const usuario = await findByUsername(username)
  const user = {
    username:usuario.username,
    password:usuario.password, 
    telefono:usuario.telefono, 
    nombre:usuario.nombre, 
    apellido:usuario.apellido, 
    avatar:usuario.avatar, 
    edad:usuario.edad, 
    direccion:usuario.direccion,
    carritoactual: usuario.carritoactual
  }
  return user
}

const postLogin = async (username)=>{
  const user = await findUser(username)
  return user
}

const postSignup = async (user)=>{
  const emailRegister = await sendNewRegisterToAdmin(user)
}

const saveCartIdInUser = async (username, id)=>{
const usuario = await addCartIdToUser(username, id)
}

const updateEmptyCartInUser = async (username)=>{
  const quitarCarrito = await updateSetEmptyCart(username)
}


module.exports = {
    postLogin,
    postSignup,
    saveCartIdInUser,
    updateEmptyCartInUser,
    findUser
}
