const { response, request } = require('express');
const Usuario =  require('../models/usuario')
const bcryptjs = require('bcryptjs')
const Error = require('../models/error')

const usuariosById = async(req, res = response) =>{
    const {id} = req.params;
    try {
        const usuario = await Usuario.findById(id);
  
        res.json(
            usuario
        );
  
    } catch (error) {
         //capturar el error
     let errores = new Error();
     errores.nivelError = 'Critico';
     errores.error.push(error);
     return res.status(500).json(errores );
    }

}

const usuariosGet = async (req, res = response) => {
    const {limite = 5, desde= 0} = req.query;
    const query = {estado: true};
 try {
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    
    ])
    
            res.json({
                total, usuarios
            });
 } catch (error) {
     //capturar el error
     let errores = new Error();
     errores.nivelError = 'Critico';
     errores.error.push(error);
     return res.status(500).json(errores );
 }

}


const usuariosPost = async (req = request, res = response)=>{

    const {nombre, correo, password, rol } = req.body;
    const usuario =  new Usuario({nombre, correo, password, rol});
    //verificar si existe el correo
   try {

    const salt  = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    
//grabar usuario

    await usuario.save();
    
   } catch (error) {
    //capturar el error
    let errores = new Error();
    errores.nivelError = 'Critico';
    errores.error.push(error);
    return res.status(500).json(errores );
   }
    return res.status(201).json(usuario );
}

const usuariosPUT = async(req, res = response) => {
    const {id }= req.params;
    const {_id,password, google, ...resto} = req.body;
        try {
            if (password){
                const salt = bcryptjs.genSaltSync();
                resto.password = bcryptjs.hashSync(password, salt);
            }
        
            const usuario = await Usuario.findByIdAndUpdate(id, resto);

  //console.log(req)
         return res.status(200).json(usuario);
        } catch (error) {
            //capturar el error
            let errores = new Error();
            errores.nivelError = 'Critico';
            errores.error.push(error);
            return res.status(500).json(errores );
        }

    //TODO validar contra base de datos
   
  
}

const usuariosDelete = async (req, res = response)=>{
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
        const usuarioAutenticado = req.usuario;
        res.status(200).json(usuario);
    } catch (error) {
             //capturar el error
             let errores = new Error();
             errores.nivelError = 'Critico';
             errores.error.push(error);
             return res.status(500).json(errores );  
    }
   
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPUT,
    usuariosDelete,
    usuariosById
}


