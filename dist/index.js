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
const hospital_1 = require("./routes/hospital");
const medico_1 = require("./routes/medico");
const busqueda_1 = require("./routes/busqueda");
const upload_1 = require("./routes/upload");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = express_1.default();
mongoose_1.default.connection.openUri('mongodb://localhost:27017/hospitalDB', (error, res) => {
    if (error)
        throw error;
    console.log("Base de datos Online");
});
app.use(express_fileupload_1.default);
// configuracion de body parser
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(app_1.rutaIndex);
app.use(usuario_1.rutasUsuario);
app.use(login_1.rutasLogin);
app.use(hospital_1.RUTASHOSPITAL);
app.use(medico_1.RUTASMEDICO);
app.use(busqueda_1.RUTASBUSQUEDA);
app.use(upload_1.RUTASUPLOAD);
app.listen(8484, (error) => {
    if (error) {
        throw new Error("Error al iniciar servidor Noder");
    }
    console.log("Servidor express corriendo en el puerto 8484");
});
