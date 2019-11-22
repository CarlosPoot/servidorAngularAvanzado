import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../clases_sistema/Config';

export default class LoginController{

    static loginUsuario( req:Request, res:Response ){

        let body = req.body;

        Usuario.findOne( { correo:body.correo }, ( error, usuarioBD:any )=>{

            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error iniciar sesión",
                    error: usuarioBD
                })
            }

            if( !usuarioBD ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Usuario y/o contraseña incorrecta",
                })
            }

            if(  !bcrypt.compareSync( body.password, usuarioBD.password ) ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Usuario y/o contraseña incorrecta",
                })
            }

            usuarioBD.password = ":>";
            let token = jwt.sign( { usuario:usuarioBD }, Config.SEED ,  { expiresIn:6000 })
            res.status(200).json({
                ok:true,
                mensaje: "Usuario logueado correctamente",
                token: token
            })
        });

    }



}
