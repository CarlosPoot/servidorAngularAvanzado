import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
mongoose.connection.openUri( 'mongodb://localhost:27017/hospitalDB', ( error, res  )=>{

    if( error )  throw error;
    console.log("Base de datos Online" );
});


// Ruta raiz del servidor
app.get("/", ( req:Request, res:Response )=>{
    res.status(200).send( "Servidor Back-End corriendo en esta dirección" );
});

app.listen(  8484, ( error )=>{
    if( error ){
        throw new Error("Error al iniciar servidor Noder");
    }
    console.log("Servidor express corriendo en el puerto 8484");
});