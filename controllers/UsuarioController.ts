import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import { NativeError, Document } from 'mongoose';
import bcrypt from 'bcrypt';


export default class UsuarioController{

    static getUsuarios(req:Request, res:Response ){

        Usuario.find({}, 'nombre email img role' ).exec(
        ( error:NativeError , usuarios:Document[] )=>{

            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al cargar usuarios",
                    error: error.message
                })
            }

            res.status(200).json({
                ok:true,
                usuarios:usuarios
            })
        })
    }

    static crearUsuario( req:Request, res:Response ){
        let body = req.body;

        let usuario = new Usuario({
            nombre: body.nombre,
            correo: body.correo,
            password: bcrypt.hashSync(body.password, 10 ),
            role:body.role,
            img:body.img
        })

        usuario.save( ( error, usuarioGuardado )=>{
            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al cargar usuarios",
                    error: error
                })
            }

            res.status(201).json({
                ok:true,
                mensaje: "Usuario guardado correctamente",
                usuario: usuarioGuardado
            })
        });

    }


    static actualizarUsuario( req:Request, res:Response ){

        let id = req.params.id;
        let body = req.body;

        Usuario.findById( id, ( error, usuario:any )=>{
            if(  error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al actualizar al usuario",
                    error: error
                })
            }
            
            if(  !usuario ){
                return res.status(400).json({
                    ok:false,
                    mensaje: `Usuario con id ${ id } no existe` ,
                    error: { message: 'No existe usuario con el id enviado' }
                })
            }
        
            usuario.nombre = body.nombre
            usuario.correo = body.correo
            usuario.role = body.role ? body.role: usuario.role

            usuario.save( ( error:any, usuarioActualizado:any )=>{

                if( error ){
                    return res.status(400).json({
                        ok:false,
                        mensaje: "Error al actualizar usuario",
                        error: error
                    })
                }

                res.status(201).json({
                    ok:true,
                    mensaje: "Usuario actualizado correctamente",
                    usuario: usuarioActualizado
                })

            })
        });
    }

    static borrarUsuario( req:Request, res:Response ){

        let id = req.params.id;

        Usuario.findByIdAndRemove(  id ,(error, usuarioEliminado )=>{

            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al borrar usuario",
                    error: error
                })
            }

            if( !usuarioEliminado ){
                return res.status(400).json({
                    ok:false,
                    mensaje: "No existe usuario con id ingresado",
                    error: { message: "No existe usuario con id ingresado" }
                })
            }

            res.status(200).json({
                ok:true,
                mensaje: "Usuario borrado correctamente",
                usuario: usuarioEliminado
            })
        });
    }




}