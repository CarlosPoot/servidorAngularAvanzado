import { Request , Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Config from '../clases_sistema/Config';


export const validarToken = ( req:Request, res:Response, next:NextFunction )=>{
    let token = req.query.token
    jwt.verify(  token, Config.SEED , ( error:any, decode:any)=>{

        if( error ){
            return res.status(401).json({
                success:false,
                mensaje: "Token incorrecto"
            })
        }   
        next();
    });
}