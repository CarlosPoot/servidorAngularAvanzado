import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { rutaIndex } from './routes/app';
import { rutasUsuario } from './routes/usuario';
import { rutasLogin } from './routes/login';

const app = express();
mongoose.connection.openUri( 'mongodb://localhost:27017/hospitalDB', ( error, res  )=>{

    if( error )  throw error;
    console.log("Base de datos Online" );
});

// configuracion de body parser
app.use(  bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )

app.use( rutaIndex );
app.use( rutasUsuario );
app.use( rutasLogin );

app.listen(  8484, ( error )=>{
    if( error ){
        throw new Error("Error al iniciar servidor Noder");
    }
    console.log("Servidor express corriendo en el puerto 8484");
});