"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../models/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsuarioController {
    static getUsuarios(req, res) {
        let desde = req.query.desde || 0;
        let limit = req.query.limite || 10;
        desde = Number(desde);
        limit = Number(limit);
        usuario_1.Usuario.find({}, 'nombre email img role')
            .skip(desde)
            .limit(limit)
            .exec((error, usuarios) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al cargar usuarios",
                    error: error.message
                });
            }
            usuario_1.Usuario.count((error, total) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error al cargar usuarios",
                        error: error.message
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    total: total
                });
            });
        });
    }
    static crearUsuario(req, res) {
        let body = req.body;
        let usuario = new usuario_1.Usuario({
            nombre: body.nombre,
            correo: body.correo,
            password: bcrypt_1.default.hashSync(body.password, 10),
            role: body.role,
            img: body.img
        });
        usuario.save((error, usuarioGuardado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al cargar usuarios",
                    error: error
                });
            }
            res.status(201).json({
                ok: true,
                mensaje: "Usuario guardado correctamente",
                usuario: usuarioGuardado
            });
        });
    }
    static actualizarUsuario(req, res) {
        let id = req.params.id;
        let body = req.body;
        usuario_1.Usuario.findById(id, (error, usuario) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar al usuario",
                    error: error
                });
            }
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Usuario con id ${id} no existe`,
                    error: { message: 'No existe usuario con el id enviado' }
                });
            }
            usuario.nombre = body.nombre;
            usuario.correo = body.correo;
            usuario.role = body.role ? body.role : usuario.role;
            usuario.save((error, usuarioActualizado) => {
                if (error) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "Error al actualizar usuario",
                        error: error
                    });
                }
                res.status(201).json({
                    ok: true,
                    mensaje: "Usuario actualizado correctamente",
                    usuario: usuarioActualizado
                });
            });
        });
    }
    static borrarUsuario(req, res) {
        let id = req.params.id;
        usuario_1.Usuario.findByIdAndRemove(id, (error, usuarioEliminado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al borrar usuario",
                    error: error
                });
            }
            if (!usuarioEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "No existe usuario con id ingresado",
                    error: { message: "No existe usuario con id ingresado" }
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: "Usuario borrado correctamente",
                usuario: usuarioEliminado
            });
        });
    }
}
exports.default = UsuarioController;
