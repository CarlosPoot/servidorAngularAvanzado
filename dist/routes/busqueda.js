"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BusquedaController_1 = __importDefault(require("../controllers/BusquedaController"));
exports.RUTASBUSQUEDA = express_1.Router();
exports.RUTASBUSQUEDA.get("/busqueda/todo/:concepto", BusquedaController_1.default.buscarTodo);
exports.RUTASBUSQUEDA.get("/busqueda/:tabla/:concepto", BusquedaController_1.default.buscarTabla);
