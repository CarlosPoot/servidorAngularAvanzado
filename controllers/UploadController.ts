import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import { NativeError, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { UploadedFile } from 'express-fileupload';
import { Medico } from '../models/medico';
import { Hospital } from '../models/hospital';
import fs from 'fs';

export default class UploadController{

    static subirImagen(req:Request, res:Response ){

        let tipo = req.params.tipo;
        let id = req.params.id;

        let tiposValidos = ["hospitales", "usuarios", "medicos"];
        if(  tiposValidos.indexOf( tipo ) < 0 ){
            return res.status(400).json({
                ok:false,
                mensaje: "Tipo de colección no valida",
                error: { message:"Tipo de coleccion no es valida" }
            })
        }

        if( !req.files ){
            return res.status(500).json({
                ok:false,
                mensaje: "No se recibieron archivos",
                error: { message:"Debe seleccionar una imagen" }
            })
        }


        // obtener nombre de archivo
        let archivo:any = req.files.imagen;
        let nombreCortado = archivo.name.split(".")
        let extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

        // extension permitidad
        let extensionesValidas = ["png", "jpg", "gif", "jpeg"];
        if(  extensionesValidas.indexOf( extensionArchivo  ) < 0 ){
            return res.status(500).json({
                ok:false,
                mensaje: "Extesión no valida",
                error: { message:"Las extensiones validas son "+ extensionesValidas.join(", ") }
            })
        }

        // Nombre de archivo personalizado
        let nombreArchivo = `${id}-${new Date().getMilliseconds()}`
        let path = `./upload/${tipo}/${nombreArchivo}`;

        archivo.mv( path, ( error:any )=>{
            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al mover archivo",
                    error: error
                })
            }

            res.status(200).json({
                ok:true,
                mensaje:"Archivo movido"
            })
        })

    }


    subirPorTipo( tipo:string ,id:string , nombreArchivo:string, res:Response ){

        if(  tipo == "usuarios" ){
            
            Usuario.findById( id , ( error , usuarioBD:any )=>{

                if( error ){
                    return res.status(500).json({
                        ok:false,
                        mensaje: "Error actualizar imagen del usuario",
                        error: error
                    })
                }else if( !usuarioBD ){
                    return res.status(400).json({
                        ok:false,
                        mensaje: "Usuario no existe",
                        error: error
                    })
                }

                let patViejo = `./upload/usuarios/${ usuarioBD.img }`
                if( fs.existsSync( patViejo ) ){
                    fs.unlink( patViejo, (err)=>{
                        return res.status(500).json({
                            ok:false,
                            mensaje: "Error actualizar imagen del usuario",
                            error: error
                        })
                    })
                }

                usuarioBD.img = nombreArchivo;
                usuarioBD.save( ( error:any, usuarioActualizado:any)=>{
                    if( error ){
                        return res.status(500).json({
                            ok:false,
                            mensaje: "Error actualizar información del usuario",
                            error: error
                        })
                    }
                    
                    usuarioActualizado.password = ":D";
                    res.status(200).json({
                        ok:true,
                        mensaje:"Imagen  de usuario actualizado",
                        usuario:usuarioActualizado
                    })

                })
            });
        }
        
        if(  tipo == "medicos" ){

            Medico.findById( id , ( error , medicoBD:any )=>{

                if( error ){
                    return res.status(500).json({
                        ok:false,
                        mensaje: "Error actualizar imagen del medico",
                        error: error
                    })
                }else if( !medicoBD ){
                    return res.status(400).json({
                        ok:false,
                        mensaje: "Medico no existe",
                        error: error
                    })
                }

                let patViejo = `./upload/medico/${ medicoBD.img }`
                if( fs.existsSync( patViejo ) ){
                    fs.unlink( patViejo, (err)=>{
                        return res.status(500).json({
                            ok:false,
                            mensaje: "Error actualizar imagen del medico",
                            error: error
                        })
                    })
                }

                medicoBD.img = nombreArchivo;
                medicoBD.save( ( error:any, medicoActualizado:any)=>{
                    if( error ){
                        return res.status(500).json({
                            ok:false,
                            mensaje: "Error actualizar información del medico",
                            error: error
                        })
                    }
                    
                    res.status(200).json({
                        ok:true,
                        mensaje:"Imagen de medico actualizado",
                        medico:medicoActualizado
                    })
                })
            });

        }
        
        if(  tipo == "hospitales" ){
            Hospital.findById( id , ( error , hospitalBD:any )=>{

                if( error ){
                    return res.status(500).json({
                        ok:false,
                        mensaje: "Error actualizar imagen del hospital",
                        error: error
                    })
                }else if( !hospitalBD ){
                    return res.status(400).json({
                        ok:false,
                        mensaje: "Hospital no existe",
                        error: error
                    })
                }

                let patViejo = `./upload/hospital/${ hospitalBD.img }`
                if( fs.existsSync( patViejo ) ){
                    fs.unlink( patViejo, (err)=>{
                        return res.status(500).json({
                            ok:false,
                            mensaje: "Error actualizar imagen del hospital",
                            error: error
                        })
                    })
                }

                hospitalBD.img = nombreArchivo;
                hospitalBD.save( ( error:any, hospitalActualizado:any)=>{
                    if( error ){
                        return res.status(500).json({
                            ok:false,
                            mensaje: "Error actualizar información del hospital",
                            error: error
                        })
                    }
                    
                    res.status(200).json({
                        ok:true,
                        mensaje:"Imagen del holpital actualizado",
                        hospital:hospitalActualizado
                    })
                })
            });
        }

    }



}