"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../models/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = __importDefault(require("../clases_sistema/Config"));
class LoginController {
    static loginUsuario(req, res) {
        let body = req.body;
        usuario_1.Usuario.findOne({ correo: body.correo }, (error, usuarioBD) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error iniciar sesión",
                    error: usuarioBD
                });
            }
            if (!usuarioBD) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Usuario y/o contraseña incorrecta",
                });
            }
            if (!bcrypt_1.default.compareSync(body.password, usuarioBD.password)) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Usuario y/o contraseña incorrecta",
                });
            }
            usuarioBD.password = ":>";
            let token = jsonwebtoken_1.default.sign({ usuario: usuarioBD }, Config_1.default.SEED, { expiresIn: 6000 });
            res.status(200).json({
                ok: true,
                mensaje: "Usuario logueado correctamente",
                token: token
            });
        });
    }
}
exports.default = LoginController;
