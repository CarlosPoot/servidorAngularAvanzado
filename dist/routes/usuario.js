"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = __importDefault(require("../controllers/UsuarioController"));
exports.rutasUsuario = express_1.Router();
exports.rutasUsuario.get("/usuario", UsuarioController_1.default.getUsuarios);
exports.rutasUsuario.post("/usuario", UsuarioController_1.default.crearUsuario);
exports.rutasUsuario.put("/usuario/:id", UsuarioController_1.default.actualizarUsuario);
exports.rutasUsuario.delete("/usuario/:id", UsuarioController_1.default.borrarUsuario);
