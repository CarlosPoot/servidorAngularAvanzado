"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = __importDefault(require("../controllers/UsuarioController"));
const mdAutenticacion_1 = require("../middlewares/mdAutenticacion");
exports.rutasUsuario = express_1.Router();
exports.rutasUsuario.get("/usuario", UsuarioController_1.default.getUsuarios);
exports.rutasUsuario.post("/usuario", mdAutenticacion_1.validarToken, UsuarioController_1.default.crearUsuario);
exports.rutasUsuario.put("/usuario/:id", mdAutenticacion_1.validarToken, UsuarioController_1.default.actualizarUsuario);
exports.rutasUsuario.delete("/usuario/:id", mdAutenticacion_1.validarToken, UsuarioController_1.default.borrarUsuario);
