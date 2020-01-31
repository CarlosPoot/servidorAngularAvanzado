"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HospitalController_1 = __importDefault(require("../controllers/HospitalController"));
const mdAutenticacion_1 = require("../middlewares/mdAutenticacion");
exports.RUTASHOSPITAL = express_1.Router();
exports.RUTASHOSPITAL.get("/hospital", mdAutenticacion_1.validarToken, HospitalController_1.default.getHospitales);
exports.RUTASHOSPITAL.post("/hospital", mdAutenticacion_1.validarToken, HospitalController_1.default.crearHospital);
exports.RUTASHOSPITAL.put("/hospital/:id", mdAutenticacion_1.validarToken, HospitalController_1.default.actualizarHospital);
exports.RUTASHOSPITAL.delete("/hospital/:id", mdAutenticacion_1.validarToken, HospitalController_1.default.borrarHospital);
