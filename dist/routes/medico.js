"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MedicoController_1 = __importDefault(require("../controllers/MedicoController"));
const mdAutenticacion_1 = require("../middlewares/mdAutenticacion");
exports.RUTASMEDICO = express_1.Router();
exports.RUTASMEDICO.get("/medico", mdAutenticacion_1.validarToken, MedicoController_1.default.getMedicos);
exports.RUTASMEDICO.post("/medico", mdAutenticacion_1.validarToken, MedicoController_1.default.crearMedico);
exports.RUTASMEDICO.put("/medico/:id", mdAutenticacion_1.validarToken, MedicoController_1.default.actualizarMedico);
exports.RUTASMEDICO.delete("/medico/:id", mdAutenticacion_1.validarToken, MedicoController_1.default.borrarMedico);
