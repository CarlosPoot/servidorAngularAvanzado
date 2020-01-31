import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import { validarToken } from '../middlewares/mdAutenticacion';

export const rutasUsuario = Router();

rutasUsuario.get("/usuario", UsuarioController.getUsuarios )
rutasUsuario.post("/usuario", validarToken  ,UsuarioController.crearUsuario )
rutasUsuario.put("/usuario/:id", validarToken ,UsuarioController.actualizarUsuario )
rutasUsuario.delete("/usuario/:id",  validarToken ,UsuarioController.borrarUsuario )

