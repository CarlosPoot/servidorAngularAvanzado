"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = __importDefault(require("../clases_sistema/Config"));
exports.validarToken = (req, res, next) => {
    let token = req.query.token;
    jsonwebtoken_1.default.verify(token, Config_1.default.SEED, (error, decode) => {
        if (error) {
            return res.status(401).json({
                success: false,
                mensaje: "Token incorrecto"
            });
        }
        req.body.usuario = decode;
        next();
    });
};
