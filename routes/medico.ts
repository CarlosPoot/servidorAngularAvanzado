import { Router } from 'express';
import MedicoController from '../controllers/MedicoController';
import { validarToken } from '../middlewares/mdAutenticacion';

export const RUTASMEDICO = Router();

RUTASMEDICO.get("/medico", validarToken  ,MedicoController.getMedicos )
RUTASMEDICO.post("/medico", validarToken  ,MedicoController.crearMedico )
RUTASMEDICO.put("/medico/:id", validarToken ,MedicoController.actualizarMedico )
RUTASMEDICO.delete("/medico/:id",  validarToken ,MedicoController.borrarMedico )