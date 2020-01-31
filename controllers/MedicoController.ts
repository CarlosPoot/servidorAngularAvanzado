import { Request, Response } from 'express';
import { NativeError } from 'mongoose';
import { Medico } from '../models/medico';

export default class MedicoController{

    static getMedicos(req:Request, res:Response ){

        let desde = req.query.desde || 0;
        let limit = req.query.limite || 10;
        desde = Number(desde);
        limit = Number(limit);

        Medico.find({})
        .skip(desde)
        .limit(limit)
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec(( error:NativeError , medicos:Document[] )=>{
            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al cargar medicos",
                    error: error.message
                })
            }

            res.status(200).json({
                ok:true,
                medicos:medicos
            })
        })
    }

    static crearMedico( req:Request, res:Response ){
        let body = req.body;

        let medico = new Medico({
            nombre: body.nombre,
            usuario:req.body.usuario.id,
            hospital: body.hospital
        })

        medico.save( ( error, medicoGuardado )=>{
            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al crear medico",
                    error: error
                })
            }
            res.status(200).json({
                ok:true,
                mensaje: "Medico guardado correctamente",
                medico: medicoGuardado
            })
        });

    }


    static actualizarMedico( req:Request, res:Response ){

        let id = req.params.id;
        let body = req.body;

        Medico.findById( id, ( error, medico:any )=>{
            if(  error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al actualizar medico",
                    error: error
                })
            }
            
            if(  !medico ){
                return res.status(400).json({
                    ok:false,
                    mensaje: `Medico con id ${ id } no existe` ,
                    error: { message: 'No existe medico con el id enviado' }
                })
            }
        
            medico.nombre = body.nombre
            medico.usuario = body.usuario.id
            medico.hospital = body.hospital

            medico.save( ( error:any, medicoActualizado:any )=>{
                if( error ){
                    return res.status(400).json({
                        ok:false,
                        mensaje: "Error al actualizar medico",
                        error: error
                    })
                }

                res.status(201).json({
                    ok:true,
                    mensaje: "Medico actualizado correctamente",
                    medico: medicoActualizado
                })
            })
        });
    }

    static borrarMedico( req:Request, res:Response ){

        let id = req.params.id;

        Medico.findByIdAndRemove(  id ,(error, medicoEliminado )=>{

            if( error ){
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error al borrar medico",
                    error: error
                })
            }

            if( !medicoEliminado ){
                return res.status(400).json({
                    ok:false,
                    mensaje: "No existe medico con id ingresado",
                    error: { message: "No existe medico con id ingresado" }
                })
            }

            res.status(200).json({
                ok:true,
                mensaje: "Medico borrado correctamente",
                medico: medicoEliminado
            })
        });
    }

}
