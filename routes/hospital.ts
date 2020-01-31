import { Router } from 'express';
import HospitalController from '../controllers/HospitalController';
import { validarToken } from '../middlewares/mdAutenticacion';

export const RUTASHOSPITAL = Router();

RUTASHOSPITAL.get("/hospital", validarToken  ,HospitalController.getHospitales )
RUTASHOSPITAL.post("/hospital", validarToken  ,HospitalController.crearHospital )
RUTASHOSPITAL.put("/hospital/:id", validarToken ,HospitalController.actualizarHospital )
RUTASHOSPITAL.delete("/hospital/:id",  validarToken ,HospitalController.borrarHospital )