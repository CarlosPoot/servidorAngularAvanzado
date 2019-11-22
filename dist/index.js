"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app_1 = require("./routes/app");
const usuario_1 = require("./routes/usuario");
const login_1 = require("./routes/login");
const app = express_1.default();
mongoose_1.default.connection.openUri('mongodb://localhost:27017/hospitalDB', (error, res) => {
    if (error)
        throw error;
    console.log("Base de datos Online");
});
// configuracion de body parser
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(app_1.rutaIndex);
app.use(usuario_1.rutasUsuario);
app.use(login_1.rutasLogin);
app.listen(8484, (error) => {
    if (error) {
        throw new Error("Error al iniciar servidor Noder");
    }
    console.log("Servidor express corriendo en el puerto 8484");
});
