import { Router } from 'express';
import { validarToken } from '../middlewares/mdAutenticacion';
import ImagenController from '../controllers/ImagenController';

export const RUTASIMAGEN = Router();

RUTASIMAGEN.get("/imagen/:tipo/:id", validarToken , ImagenController.getImagen )