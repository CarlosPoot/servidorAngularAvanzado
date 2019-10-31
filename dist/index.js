"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
mongoose_1.default.connection.openUri('mongodb://localhost:27017/hospitalDB', (error, res) => {
    if (error)
        throw error;
    console.log("Base de datos Online");
});
// Ruta raiz del servidor
app.get("/", (req, res) => {
    res.status(200).send("Servidor Back-End corriendo en esta dirección");
});
app.listen(8484, (error) => {
    if (error) {
        throw new Error("Error al iniciar servidor Noder");
    }
    console.log("Servidor express corriendo en el puerto 8484");
});
