import { Request, Response } from 'express';
import { Hospital } from '../models/hospital';
import { NativeError } from 'mongoose';
import path from 'path';
import fs from 'fs';

export default class ImagenController{


    static getImagen(req:Request, res:Response ){

        let tipo = req.params.tipo;
        let img = req.params.img;
        
        let pathImagen = path.resolve(  __dirname, `../upload/${tipo}/${img}`);
        
        if( fs.existsSync(  pathImagen )  ){
            res.sendFile( pathImagen );
        }else{
            let pathNoImage = path.resolve( __dirname, "../assets/noimage.png");
            res.sendFile(pathImagen);
        }
    }


}
