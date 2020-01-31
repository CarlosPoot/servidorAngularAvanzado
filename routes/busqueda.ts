import { Router } from 'express';
import BusquedaController from '../controllers/BusquedaController';

export const RUTASBUSQUEDA = Router();

RUTASBUSQUEDA.get("/busqueda/todo/:concepto", BusquedaController.buscarTodo )
RUTASBUSQUEDA.get("/busqueda/:tabla/:concepto", BusquedaController.buscarTabla )