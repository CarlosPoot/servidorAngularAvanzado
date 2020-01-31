import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import { Hospital } from '../models/hospital';
import { Medico } from '../models/medico';

export default class BusquedaController{

    static buscarTodo( req:Request, res:Response ){

        let busqueda = req.params.concepto;
        let expresion = new RegExp( busqueda, 'i' );

        Promise.all([ 
            BusquedaController.getHospitales( expresion ),
            BusquedaController.getMedicos(expresion ),
            BusquedaController.getUsuarios(expresion)
        ]).then( (respuestas)=>{
            res.status(200).json({
                ok: true,
                usuarios: respuestas[2],
                hospitales: respuestas[0],
                medicos: respuestas[1]
            })
        }).catch( errro =>{
            res.status( 500 ).json({
                ok:false,
                mensaje: 'Ocurrio un error al realizar la busqueda',
                error: errro
            })

        });
        
    }

    static buscarTabla( req:Request, res:Response ){

        let concepto = req.params.concepto;
        let tabla = req.params.tabla;
        let expresion = new RegExp( concepto, 'i');

        let promesa:Promise<any>;

        switch( tabla ){

            case 'usuario':
                promesa = BusquedaController.getUsuarios( expresion );
                break;
            case 'hospital':
                promesa = BusquedaController.getHospitales( expresion );
                break;
            case 'medico':
                promesa = BusquedaController.getMedicos( expresion );
                break;
            default:
                // bad request
                return res.status(400).json({
                    ok:false,
                    mensaje: "Tabla recibida incorrecta"
                })
                break;

            promesa.then( data =>{
                res.status(200).json({
                    ok:true,
                    [tabla]: data
                })
            }).catch( error=>{
                // error interno
                return res.status(500).json({
                    ok:false,
                    mensaje: "Error inesperado al realizar busqueda"
                })
            })
        }
    }


    static getHospitales( expresion:any ){
        return new Promise( (reject:any, resolve:any )=>{
            Hospital.find({ 'nombre': expresion })
                    .populate('usuario', 'nombre email')
                    .exec( (error, hospitales:any)=>{
                        if( error ){
                            reject( "Error al buscar hospitales", error );
                        }
                        resolve( hospitales );
                    });

        })
    }


    static getMedicos( expresion:any ){
        return new Promise( (reject:any, resolve:any )=>{
            Medico.find({ 'nombre': expresion })
                    .populate('usuario', 'nombre email')
                    .populate('hospital')
                    .exec( (error, medicos:any)=>{
                        if( error ){
                            reject( "Error al buscar medicos", error );
                        }
                        resolve( medicos );
                    });
        })
    }


    static getUsuarios( expresion:any ){
        return new Promise( (reject:any, resolve:any )=>{
            Usuario.find( {}, 'nombre email role' )
                .or( [{'nombre': expresion}, { 'email:':expresion }] )
                .exec( (error, usuarios:any)=>{
                    if( error ){
                        reject( "Error al buscar usuarios", error );
                    }
                    resolve( usuarios );
                });
        })
    }


}
