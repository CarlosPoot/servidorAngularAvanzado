import { Request, Response } from 'express';

export default class AppController{

    static getIndex( req:Request, res:Response ){
        res.status(200).json({
            ok:true,
            mensaje: "Servidor principal"
        })
    }

}