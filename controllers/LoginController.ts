import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../clases_sistema/Config';
import { OAuth2Client } from 'google-auth-library';

export default class LoginController{


    static async loginGoogle(  req:Request, res:Response ){

        let token = req.body.token;
        let googleUser:any = await this.verify( token ).catch( e =>{
            return res.status(403).json({
                ok:false,
                mensaje:"Token no válido"
            })
        });


        Usuario.findOne( { email:googleUser.email }, (err , usuarioDB:any )=>{
            if( err ){
                res.status(500).json({
                    ok:false,
                    mensaje: "Error al buscar usuario",
                    error:err
                })
            }

            if( usuarioDB ){
                if( usuarioDB.google == false ){
                    return res.status(400).json({
                        ok:false,
                        mensaje: "Debe de usar la autenticación normal"
                    })
                }else{

                    let token = jwt.sign( { usuario:usuarioDB }, Config.SEED ,  { expiresIn:6000 })
                    res.status(200).json({
                        ok:true,
                        mensaje: "Usuario logueado correctamente",
                        token: token,
                        usuario:usuarioDB._id
                    })

                }   
            }else{

                var usuario:any  = new Usuario();
                usuario.nombre   = googleUser.nombre;
                usuario.email    = googleUser.email;
                usuario.img      = googleUser.img;
                usuario.google   = true;
                usuario.password = ":>";

                usuario.save( ( err:any, usuarioBD:any )=>{
                    if( err ){
                        return res.status(500).json({
                            ok:false,
                            mensaje: "Error al registrar usuario con google"
                        })
                    }

                    let token = jwt.sign( { usuario:usuarioDB }, Config.SEED ,  { expiresIn:6000 })
                    res.status(200).json({
                        ok:true,
                        mensaje: "Usuario logueado correctamente",
                        token: token,
                        usuario:usuarioDB._id
                    })
                })
            }
            
        });

        return res.status(200).json({
            ok:true,
            mensaje:"Ok!!",
            googleUser: googleUser
        })
    }

    static async verify( token:string ){
        const client = new OAuth2Client(  Config.CLIENTE_ID_GOOGLE );
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: Config.CLIENTE_ID_GOOGLE  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload:any = ticket.getPayload();
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
      
        return {
            nombre : payload.name,
            email  : payload.email,
            img    : payload.picturre,
            google :true
        }
    }


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
